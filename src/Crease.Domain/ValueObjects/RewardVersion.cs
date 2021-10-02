using System;
using System.Collections.Generic;
using System.Linq;
using Crease.Domain.Common;
using Crease.Domain.Entities;

namespace Crease.Domain.ValueObjects
{
    public class RewardVersion : Entity
    {
        public DateTime EffectiveStartDate { get; set; }

        public DateTime EffectiveEndDate { get; set; }

        public List<RewardComputation> RewardComputations { get; set; }

        public (RewardComputation computation, CardStatementReward reward) ComputeReward(Transaction selectedTransaction,
            IEnumerable<Transaction> transactions)
        {
            var totalTransactionAmount = transactions.Sum(transaction => transaction.Amount);
            var validComputations =
                RewardComputations
                    .FindAll(computation => computation.IsValidComputation(selectedTransaction, totalTransactionAmount))
                    .OrderBy(computation => computation.Priority)
                    .ToList();

            return !validComputations.Any()
                ? (null, CardStatementReward.NoRewards)
                : (validComputations[0],
                    CardStatementReward.WithRewardType(validComputations[0].RewardType,
                        Math.Round(validComputations[0].Multiplier * selectedTransaction.Amount, 2)));
        }
    }
}