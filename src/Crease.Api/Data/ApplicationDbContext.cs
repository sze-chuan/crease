using System.Reflection;
using Crease.WebUI.Models;
using Microsoft.EntityFrameworkCore;

namespace Crease.WebUI.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }
        
    public DbSet<Card> Cards { get; set; }
        
    public DbSet<CardStatement> CardStatements { get; set; }
        
    public DbSet<BankCard> BankCards { get; set; }
    

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.HasDefaultContainer("cards");
        
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}