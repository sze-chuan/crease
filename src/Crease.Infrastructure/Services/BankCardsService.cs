using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;

namespace Crease.Infrastructure.Services
{
    public class BankCardsService : IBankCardsService
    {
        private IList<BankCard> BankCards { get; }

        public BankCardsService(string resourceFilePath)
        {
            BankCards = JsonSerializer.Deserialize<IList<BankCard>>(File.ReadAllText(resourceFilePath));
        }

        public IList<BankCard> GetBankCards()
        {
            return BankCards;
        }
    }
}