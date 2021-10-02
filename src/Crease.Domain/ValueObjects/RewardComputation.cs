using System.Collections.Generic;
using Crease.Domain.Common;
using Crease.Domain.Entities;
using Crease.Domain.Extensions;

namespace Crease.Domain.ValueObjects
{
    public class RewardComputation : Entity
    {
        public int Priority { get; set; }
        
        public RewardType RewardType { get; set; }

        public List<PaymentType> PaymentTypes { get; set; }

        public List<TransactionCategory> TransactionCategories { get; set; }

        public decimal Multiplier { get; set; }

        public decimal RewardsCap { get; set; }

        public decimal MinSpendAmount { get; set; }
        
        public bool IsValidComputation(Transaction transaction, decimal totalTransactionAmount)
        {
            if (PaymentTypes.IsNullOrEmpty() && TransactionCategories.IsNullOrEmpty())
            {
                return true;
            }

            return (PaymentTypes.Contains(transaction.PaymentType) || TransactionCategories.Contains(transaction.TransactionCategory))
                && totalTransactionAmount >= MinSpendAmount;
        }
    }
}