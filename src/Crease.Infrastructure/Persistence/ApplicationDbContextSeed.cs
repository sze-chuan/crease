using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using Crease.Domain.ValueObjects;
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
            var bankCards = await context.BankCards.ToListAsync();

            if (!bankCards.Any())
            {
                context.BankCards.Add(new BankCard
                {
                    Bank = Bank.Dbs,
                    Name = "Live Fresh",
                    StatementType = StatementType.Calendar,
                    TransactionDateType = TransactionDateType.Transaction
                });

                await context.SaveChangesAsync(CancellationToken.None);
            }
        }
        
        private static async Task SeedCardData(IApplicationDbContext context)
        {
            // Seed, if necessary
            var cards = await context.Cards.ToListAsync();
            var bankCards = await context.BankCards.Where(card => card.Name == "Live Fresh").ToListAsync();
            
            if (!cards.Any() && bankCards.Any())
            {
                context.Cards.Add(new Card
                {
                    BankCardId = bankCards[0].Id.ToString(),
                    CardNumber = "8604",
                    Name = "DBS Live Fresh",
                    StartDate = new DateTime(2021, 9, 1, 0, 0, 0, DateTimeKind.Utc),
                    UserId = "development"
                });
                
                await context.SaveChangesAsync(CancellationToken.None);
            }
        }
    }
}
