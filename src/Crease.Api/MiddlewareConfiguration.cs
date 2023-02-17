using Crease.WebUI.Exceptions;
using Microsoft.AspNetCore.Authorization;

namespace Crease.WebUI;

public static class MiddlewareConfiguration
{
    public static WebApplication SetupMiddleware(this WebApplication app)
    {
        if (!app.Environment.IsDevelopment())
        {
            app.UseHsts();
        }
        
        app
            .UseRouting()
            .UseStaticFiles()
            .UseSwaggerUi3(settings =>
            {
                settings.Path = "/api";
                settings.DocumentPath = "/api/specification.json";
            })
            .UseAuthentication()
            .UseAuthorization()
            .UseExceptionHandler(builder => builder.Run(async context => await ExceptionHandler.WriteResponseAsync(context)))
            .UseEndpoints(endpoints =>
            {
                if (app.Environment.IsDevelopment() && app.Configuration.GetValue<bool>("AllowAnonymousAttribute"))
                {
                    endpoints.MapControllers().WithMetadata(new AllowAnonymousAttribute());
                }
                else
                {
                    endpoints.MapControllers();
                }
            });
        
        if (app.Environment.IsDevelopment())
        {
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "client-app";
                spa.UseProxyToSpaDevelopmentServer(app.Configuration["SpaBaseUrl"] ?? "http://localhost:3000");
            });
        }
        
        return app;
    }
}