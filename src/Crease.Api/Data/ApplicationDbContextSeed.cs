using Crease.WebUI.Models;
using Microsoft.EntityFrameworkCore;

namespace Crease.WebUI.Data;

public static class ApplicationDbContextSeed
{
    public static async Task SeedSampleDataAsync(ApplicationDbContext context, bool isDevelopmentEnv)
    {
        await context.Database.EnsureCreatedAsync();
        await SeedBankCardsData(context);

        if (isDevelopmentEnv)
        {
            await SeedCardData(context);
        }
    }

    private static async Task SeedBankCardsData(ApplicationDbContext context)
    {
        var currentBankCards = await context.BankCards.ToListAsync();

        foreach (var bankCard in BankCardsData.BankCards.Where(bankCard =>
                     currentBankCards.All(x => x.Name != bankCard.Name)))
        {
            context.BankCards.Add(bankCard);
            await context.SaveChangesAsync(CancellationToken.None);
        }
    }

    private static async Task SeedCardData(ApplicationDbContext context)
    {
        var cards = await context.Cards.ToListAsync();
        if (cards.Any())
        {
            return;
        }
            
        var frankCard = await context.BankCards.Where(x => x.Name == "Live Fresh").FirstAsync();
            
        if (frankCard != null)
        {
            var card = new Card
            {
                Name = "Test Frank Card",
                BankCardId = frankCard.Id,
                CardNumber = "9999",
                StartDate = new DateTime(2021, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                UserId = "development"
            };

            context.Cards.Add(card);
            await context.SaveChangesAsync(CancellationToken.None);
        }
    }
}