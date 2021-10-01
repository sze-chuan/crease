using System;
using System.Collections.Generic;
using Crease.Domain.Common;

namespace Crease.Domain.ValueObjects
{
    public class RewardVersion : ValueObject
    {
        public DateTime EffectiveStartDate { get; }
        
        public DateTime? EffectiveEndDate { get; }
        
        public decimal MinSpendAmount { get; }
        
        public List<RewardComputation> RewardComputations { get; }
        
        private RewardVersion()
        {
        }

        public RewardVersion(DateTime effectiveStartDate, DateTime effectiveEndDate, decimal minSpendAmount,
            List<RewardComputation> rewardComputations)
        {
            EffectiveStartDate = effectiveStartDate;
            EffectiveEndDate = effectiveEndDate;
            MinSpendAmount = minSpendAmount;
            RewardComputations = rewardComputations;
        }
        
        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return EffectiveStartDate;
            yield return EffectiveEndDate;
            yield return MinSpendAmount;
            yield return RewardComputations;
        }
    }
}