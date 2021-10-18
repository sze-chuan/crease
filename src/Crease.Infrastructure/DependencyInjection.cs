using Crease.Application.Common.Interfaces;
using Crease.Infrastructure.Persistence;
using Crease.Infrastructure.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

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
                    // Todo: Add production cosmos db configuration
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
    }
}