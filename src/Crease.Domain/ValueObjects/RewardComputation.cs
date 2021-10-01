using System.Collections.Generic;
using Crease.Domain.Common;

namespace Crease.Domain.ValueObjects
{
    public class RewardComputation : ValueObject
    {
        public readonly RewardType RewardType;

        public List<PaymentType> PaymentTypes { get; }

        public List<TransactionCategory> TransactionCategories { get; }

        public readonly decimal Multiplier;

        public readonly decimal? RewardsCap;

        private RewardComputation()
        {
        }

        public RewardComputation(RewardType rewardType, List<PaymentType> paymentTypes, List<TransactionCategory> transactionCategories,
            decimal multiplier, decimal? rewardsCap)
        {
            RewardType = rewardType;
            PaymentTypes = paymentTypes;
            TransactionCategories = transactionCategories;
            Multiplier = multiplier;
            RewardsCap = rewardsCap;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return RewardType;
            yield return Multiplier;
            yield return RewardsCap;
            yield return PaymentTypes; 
            yield return TransactionCategories;
        }
    }
}