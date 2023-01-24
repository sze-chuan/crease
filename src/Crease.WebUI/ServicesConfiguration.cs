using System.Configuration;
using System.Reflection;
using Azure.Core;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Crease.WebUI.Data;
using Crease.WebUI.Services;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;

namespace Crease.WebUI;

public static class ServicesConfiguration
{
    public static WebApplicationBuilder RegisterServices(this WebApplicationBuilder builder)
    {
        // Register your dependencies
        RegisterDatabase(builder);

        builder.Services
            .AddAutoMapper(Assembly.GetExecutingAssembly())
            .AddMediatR(Assembly.GetExecutingAssembly())
            .AddHttpContextAccessor();

        builder.Services
            .AddControllers()
            .AddFluentValidation(fv => fv.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly()));
        
        builder.Services
            .AddAuthorization()   
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApi(options => { builder.Configuration.Bind("AzureAdB2C", options); },
                options => { builder.Configuration.Bind("AzureAdB2C", options); });
        
        var useDevelopmentUser = builder.Configuration.GetValue<bool>("UseDevelopmentUser");
        builder.Services.AddSingleton<ICurrentUserService>(
            userService => new CurrentUserService(userService.GetService<IHttpContextAccessor>(), useDevelopmentUser));

        builder.Services.AddOpenApiDocument(configure => { configure.Title = "Crease API"; });

        return builder;
    }

    private static void RegisterDatabase(WebApplicationBuilder builder)
    {
        const string dbName = "Crease";
        
        if (builder.Configuration.GetValue<bool>("UseInMemoryDatabase"))
        {
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseInMemoryDatabase(dbName));
        }
        else
        {
            var dbConnectionString = builder.Environment.IsProduction()
                ? GetDbConnectionStringFromKeyVault(builder.Configuration)
                : builder.Configuration.GetConnectionString(dbName);
            
            builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseCosmos(
                dbConnectionString,
                dbName
            ));
        }
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