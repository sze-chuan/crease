using System.Collections.Generic;
using Crease.Domain.Entities;

namespace Crease.Application.Common.Interfaces
{
    public interface IBankCardsService
    {
        IList<BankCard> GetBankCards();
    }
}