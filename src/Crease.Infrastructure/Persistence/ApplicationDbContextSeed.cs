using System;
using System.Collections.Generic;
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
                    TransactionDateType = TransactionDateType.Transaction,
                    RewardVersions = new List<RewardVersion>
                    {
                        new()
                        {
                            EffectiveStartDate = new DateTime(2021, 9, 1, 0, 0, 0, DateTimeKind.Utc),
                            EffectiveEndDate = DateTime.MaxValue,
                            RewardComputations = new List<RewardComputation>
                            {
                                new()
                                {
                                    Priority = 1,
                                    RewardType = RewardType.Cashback,
                                    PaymentTypes = new List<PaymentType> { PaymentType.Contactless },
                                    Multiplier = 0.05M,
                                    RewardsCap = 20,
                                    MinSpendAmount = 600
                                },
                                new()
                                {
                                    Priority = 2,
                                    RewardType = RewardType.Cashback,
                                    PaymentTypes = new List<PaymentType> { PaymentType.Online },
                                    Multiplier = 0.05M,
                                    RewardsCap = 20,
                                    MinSpendAmount = 600
                                },
                                new()
                                {
                                    Priority = 3,
                                    RewardType = RewardType.Cashback,
                                    Multiplier = 0.003M,
                                    RewardsCap = 0,
                                    MinSpendAmount = 0
                                }
                            }
                        }
                    }
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