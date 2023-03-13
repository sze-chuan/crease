using Crease.WebUI;
using Crease.WebUI.Data;
using ApplicationDbContext = Crease.WebUI.Data.ApplicationDbContext;

var builder = WebApplication.CreateBuilder(args);

builder.Host.ConfigureAppConfiguration((context, builder) =>
{
    builder.AddUserSecrets<Program>(!context.HostingEnvironment.IsDevelopment());
});

var app = builder
    .RegisterServices()
    .Build()
    .SetupMiddleware();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<ApplicationDbContext>();
    await ApplicationDbContextSeed.SeedSampleDataAsync(context);
}
catch (Exception ex)
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred while migrating or seeding the database.");
    throw;
}

app.Run();
