using System.Reflection;
using Azure.Core;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Crease.WebUI.Data;
using Crease.WebUI.Exceptions;
using Crease.WebUI.Services;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;

namespace Crease.WebUI;

public class Startup
{
    public Startup(IConfiguration configuration, IWebHostEnvironment environment)
    {
        Configuration = configuration;
        CurrentEnvironment = environment;
    }

    public IConfiguration Configuration { get; }
        
    public IWebHostEnvironment CurrentEnvironment { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        const string dbName = "Crease";
        
        if (Configuration.GetValue<bool>("UseInMemoryDatabase"))
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseInMemoryDatabase(dbName));
        }
        else
        {
            var dbConnectionString = CurrentEnvironment.IsProduction()
                ? GetDbConnectionStringFromKeyVault(Configuration)
                : Configuration.GetConnectionString(dbName);
            
            services.AddDbContext<ApplicationDbContext>(options => options.UseCosmos(
                dbConnectionString,
                dbName
            ));
        }
        
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.AddMediatR(Assembly.GetExecutingAssembly());
                
        var useDevelopmentUser = Configuration.GetValue<bool>("UseDevelopmentUser");
        services.AddSingleton<ICurrentUserService>(
            userService => new CurrentUserService(userService.GetService<IHttpContextAccessor>(), useDevelopmentUser));
        services.AddRazorPages();

        services.AddHttpContextAccessor();
        services.AddRouting(options => options.LowercaseUrls = true);

        services
            .AddControllersWithViews()
            .AddFluentValidation(x => x.AutomaticValidationEnabled = false);
        
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApi(options =>
                {
                    Configuration.Bind("AzureAdB2C", options);
                    options.TokenValidationParameters.NameClaimType = "name";
                },
                options => { Configuration.Bind("AzureAdB2C", options); });
        services.AddAuthorization();

        // For development purposes
        if (CurrentEnvironment.IsDevelopment())
        {
            services.AddCors(options => options.AddPolicy("default", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));    
        }

        services.AddOpenApiDocument(configure => { configure.Title = "Crease API"; });
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

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseSwaggerUi3(settings =>
        {
            settings.Path = "/api";
            settings.DocumentPath = "/api/specification.json";
        });

        if (env.IsDevelopment())
        {
            app.UseCors("default");
        }
            
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseExceptionHandler(a => a.Run(async context => await ExceptionHandler.WriteResponseAsync(context)));
        
        app.UseEndpoints(endpoints =>
        {
            if (env.IsDevelopment() && Configuration.GetValue<bool>("AllowAnonymousAttribute"))
            {
                endpoints.MapControllers().WithMetadata(new AllowAnonymousAttribute());
            }
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");
            endpoints.MapRazorPages();
        });

        if (env.IsDevelopment())
        {
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "client-app";
                spa.UseProxyToSpaDevelopmentServer(Configuration["SpaBaseUrl"] ?? "http://localhost:3000");
            });
        }
    }
}