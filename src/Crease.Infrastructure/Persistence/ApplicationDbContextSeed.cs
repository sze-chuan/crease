using System;
using System.Linq;
using System.Threading.Tasks;
using Crease.Domain.Entities;

namespace Crease.Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedSampleDataAsync(ApplicationDbContext context)
        {
            // Seed, if necessary
            if (!context.Cards.Any())
            {
                context.Cards.Add(new Card
                {
                    BankCardId = 1,
                    CardNumber = "8604",
                    Name = "DBS Live Fresh",
                    StartDate = new DateTime(2021, 9, 1)
                });

                await context.SaveChangesAsync();
            }
        }
    }
}
