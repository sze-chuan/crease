using System;
using Crease.Application.Common.Interfaces;
using Crease.Infrastructure.Persistence;
using Crease.Infrastructure.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Azure.Core;

namespace Crease.Infrastructure
{
    public static class DependencyInjection
    {
        public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration,
            IWebHostEnvironment environment)
        {
            const string databaseName = "Crease";
            
            if (configuration.GetValue<bool>("UseInMemoryDatabase"))
            {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseInMemoryDatabase(databaseName));
            }
            else
            {
                if (environment.IsProduction())
                {
                    services.AddDbContext<ApplicationDbContext>(options => options.UseCosmos(
                        GetDbConnectionStringFromKeyVault(configuration),
                        databaseName
                    ));
                }
                else
                {
                    services.AddDbContext<ApplicationDbContext>(options => options.UseCosmos(
                        configuration.GetConnectionString(databaseName),
                        databaseName
                    ));
                }
                
            }

            services.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDbContext>());
            services.AddScoped<IDomainEventService, DomainEventService>();
            services.AddTransient<IDateTime, DateTimeService>();
        }

        private static string GetDbConnectionStringFromKeyVault(IConfiguration configuration)
        {
            var keyVaultUri = configuration.GetValue<string>("AzureKeyVault:Uri");
            var keyVaultSecretKey = configuration.GetValue<string>("AzureKeyVault:SecretKey");
            var options = new SecretClientOptions
            {
                Retry =
                {
                    Delay= TimeSpan.FromSeconds(2),
                    MaxDelay = TimeSpan.FromSeconds(16),
                    MaxRetries = 5,
                    Mode = RetryMode.Exponential
                }
            };
            var client = new SecretClient(new Uri(keyVaultUri), new DefaultAzureCredential(),options);

            KeyVaultSecret secret = client.GetSecret(keyVaultSecretKey);

            return secret.Value;
        }
    }
}