using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Crease.Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedSampleDataAsync(ApplicationDbContext context)
        {
            await context.Database.EnsureCreatedAsync();
            await SeedBankCardsData(context);
            await SeedCardData(context);
        }

        private static async Task SeedBankCardsData(IApplicationDbContext context)
        {
            var currentBankCards = await context.BankCards.ToListAsync();

            foreach (var bankCard in BankCardsData.BankCards.Where(bankCard =>
                currentBankCards.All(x => x.Name != bankCard.Name)))
            {
                context.BankCards.Add(bankCard);
                await context.SaveChangesAsync(CancellationToken.None);
            }
        }

        private static async Task SeedCardData(IApplicationDbContext context)
        {
            if (context.Cards.Any())
            {
                return;
            }
            
            var frankCard = await context.BankCards.Where(x => x.Name == "Frank").FirstAsync();
            
            if (frankCard != null)
            {
                var card = new Card
                {
                    Name = "Test Frank Card",
                    BankCardId = frankCard.Id.ToString(),
                    CardNumber = "9999",
                    StartDate = new DateTime(2021, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                    UserId = "development"
                };

                context.Cards.Add(card);
                await context.SaveChangesAsync(CancellationToken.None);
            }
        }
    }
}