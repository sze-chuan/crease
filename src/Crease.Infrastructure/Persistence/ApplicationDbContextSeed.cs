using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Crease.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Crease.Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedSampleDataAsync(ApplicationDbContext context)
        {
            await context.Database.EnsureCreatedAsync();
            await SeedBankCardsData(context);
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
    }
}