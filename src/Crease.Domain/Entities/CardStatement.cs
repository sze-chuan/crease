using System;
using System.Collections.Generic;
using System.Linq;
using Crease.Domain.Common;
using Crease.Domain.ValueObjects;

namespace Crease.Domain.Entities
{
    public class CardStatement : Entity
    {
        public DateTime MonthYear { get; set; }
        
        public string CardId { get; set; }
        
        public string BankCardId { get; set; }

        public string UserId { get; set; }
        
        public List<Transaction> Transactions { get; private set; } = new();
        
        public CardStatementReward StatementReward { get; set; }

        public void UpdateTransaction(Transaction updatedTransaction)
        {
            var transactionToBeUpdated = Transactions.FirstOrDefault(transaction => transaction.Id == updatedTransaction.Id);

            if (transactionToBeUpdated == null)
            {
                return;
            }
            
            transactionToBeUpdated.Amount = updatedTransaction.Amount;
            transactionToBeUpdated.Date = updatedTransaction.Date;
            transactionToBeUpdated.Description = updatedTransaction.Description;
            transactionToBeUpdated.PaymentType = updatedTransaction.PaymentType;
            transactionToBeUpdated.TransactionCategory = updatedTransaction.TransactionCategory;
        }

        public void RemoveTransaction(Guid transactionId)
        {
            Transactions.RemoveAll(transaction => transaction.Id == transactionId);
        }

        public void UpdateStatementReward(RewardVersion rewardVersion)
        {
            if (rewardVersion == null)
            {
                return;
            }

            var rewardsDict = new Dictionary<Guid, CardStatementReward>();
            var rewardsCapDict = new Dictionary<Guid, decimal>();

            foreach (var transaction in Transactions)
            {
                var (computation, reward) = rewardVersion.ComputeReward(transaction, Transactions);

                if (reward.Equals(CardStatementReward.NoRewards))
                {
                    continue;
                }

                if (rewardsDict.ContainsKey(computation.Id))
                {
                    var totalReward = rewardsDict[computation.Id] + reward;

                    rewardsDict[computation.Id] =
                        totalReward.GetRewardValue(computation.RewardType) > rewardsCapDict[computation.Id] 
                            ? CardStatementReward.WithRewardType(computation.RewardType, rewardsCapDict[computation.Id])  
                            : totalReward;
                }
                else
                {
                    rewardsDict.Add(computation.Id, reward);
                    rewardsCapDict.Add(computation.Id, computation.RewardsCap);
                }
            }

            StatementReward = rewardsDict.Aggregate(CardStatementReward.NoRewards, (current, reward) => current + reward.Value);
        }
    }
}