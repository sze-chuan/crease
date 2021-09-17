using System;
using System.Linq;
using System.Threading.Tasks;
using Crease.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Crease.Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedSampleDataAsync(ApplicationDbContext context)
        {
            await context.Database.EnsureCreatedAsync();
            
            // Seed, if necessary
            var cards = await context.Cards.ToListAsync();
            
            if (!cards.Any())
            {
                context.Cards.Add(new Card
                {
                    BankCardId = 1,
                    CardNumber = "8604",
                    Name = "DBS Live Fresh",
                    StartDate = new DateTime(2021, 9, 1, 0, 0, 0, DateTimeKind.Utc),
                    UserId = "development"
                });

                await context.SaveChangesAsync();
            }
        }
    }
}
