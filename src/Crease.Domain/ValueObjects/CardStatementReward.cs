using Crease.Domain.Common;

namespace Crease.Domain.ValueObjects;

public class CardStatementReward : ValueObject
{
    private CardStatementReward()
    {
    }
        
    private CardStatementReward(decimal? miles, decimal? cashback, decimal? points)
    {
        Miles = miles;
        Cashback = cashback;
        Points = points;
    }

    public decimal? Miles { get; }
        
    public decimal? Cashback { get; }
        
    public decimal? Points { get; }

    public static CardStatementReward NoRewards => new(0, 0, 0);

    public static CardStatementReward WithRewardType(RewardType rewardType, decimal reward)
    {
        if (rewardType.Equals(RewardType.Cashback))
        {
            return new CardStatementReward(0, reward, 0);
        }

        return rewardType.Equals(RewardType.Miles) ? new CardStatementReward(reward, 0, 0) : new CardStatementReward(0, 0, reward);
    }

    public static CardStatementReward operator +(CardStatementReward a, CardStatementReward b)
    {
        return new CardStatementReward(a.Miles + b.Miles, a.Cashback + b.Cashback, a.Points + b.Points);
    }

    public static CardStatementReward operator -(CardStatementReward a, CardStatementReward b)
    {
        return new CardStatementReward(a.Miles - b.Miles, a.Cashback - b.Cashback, a.Points - b.Points);
    }

    public decimal? GetRewardValue(RewardType rewardType)
    {
        if (rewardType.Equals(RewardType.Cashback))
        {
            return Cashback;
        }

        return rewardType.Equals(RewardType.Miles) ? Miles : Points;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Miles;
        yield return Cashback;
        yield return Points;
    }
}