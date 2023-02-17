using Crease.WebUI.Models.Common;
using Crease.WebUI.Models.ValueObjects;

namespace Crease.WebUI.Models;

public class CardStatement : Entity
{
    public DateTime MonthYear { get; set; }
        
    public Guid CardId { get; set; }
        
    public Guid BankCardId { get; set; }

    public string UserId { get; set; }
        
    public List<Transaction> Transactions { get; private set; } = new();
        
    public CardStatementReward StatementReward { get; set; }

    public bool UpdateTransaction(Transaction updatedTransaction)
    {
        var transactionToBeUpdated = Transactions.FirstOrDefault(transaction => transaction.Id == updatedTransaction.Id);

        if (transactionToBeUpdated == null)
        {
            return false;
        }
            
        transactionToBeUpdated.Amount = updatedTransaction.Amount;
        transactionToBeUpdated.Date = updatedTransaction.Date;
        transactionToBeUpdated.Description = updatedTransaction.Description;
        transactionToBeUpdated.PaymentType = updatedTransaction.PaymentType;
        transactionToBeUpdated.TransactionCategory = updatedTransaction.TransactionCategory;

        return true;
    }

    public bool RemoveTransaction(Guid transactionId)
    {
        var transactionToDelete = Transactions.Find(transaction => transaction.Id == transactionId);

        if (transactionToDelete == null)
        {
            return false;
        }
        
        Transactions.Remove(transactionToDelete);
        return true;
    }

    public void UpdateStatementReward(RewardVersion rewardVersion)
    {
        if (rewardVersion == null)
        {
            return;
        }

        var rewardsDict = new Dictionary<Guid, CardStatementReward>();

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

                rewardsDict[computation.Id] = CalculateRewardWithCap(totalReward, computation);
            }
            else
            {
                rewardsDict.Add(computation.Id, CalculateRewardWithCap(reward, computation));
            }
        }

        StatementReward = rewardsDict.Aggregate(CardStatementReward.NoRewards, (current, reward) => current + reward.Value);
    }

    private static CardStatementReward CalculateRewardWithCap(CardStatementReward reward, RewardComputation computation)
    {
        return reward.GetRewardValue(computation.RewardType) > computation.RewardsCap
            ? CardStatementReward.WithRewardType(computation.RewardType, computation.RewardsCap)  
            : reward;
    }
}