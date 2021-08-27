using Crease.Application.Common.Interfaces;
using Crease.Infrastructure.Persistence;
using Crease.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Crease.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            const string databaseName = "Crease";
            
            if (configuration.GetValue<bool>("UseInMemoryDatabase"))
            {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseInMemoryDatabase(databaseName));
            }
            else
            {
                services.AddDbContext<ApplicationDbContext>(options => options.UseCosmos(
                    configuration.GetConnectionString(databaseName),
                    databaseName
                ));
            }

            services.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDbContext>());

            services.AddScoped<IDomainEventService, DomainEventService>();

            services.AddTransient<IDateTime, DateTimeService>();
            services.AddTransient<IBankCardsService>(s =>
                new BankCardsService(configuration.GetSection("BankCardsResourceFilePath").Value));
            
            return services;
        }
    }
}