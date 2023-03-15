using Crease.WebUI.Models;
using Crease.WebUI.Models.ValueObjects;

namespace Crease.WebUI.Data;

public static class BankCardsData
{
    private static readonly BankCard LiveFresh = new()
    {
        Bank = Bank.Dbs,
        Name = "Live Fresh",
        StatementType = StatementType.Calendar,
        TransactionDateType = TransactionDateType.Transaction,
        RewardVersions = new List<RewardVersion>
        {
            new()
            {
                EffectiveStartDate = DateTime.MinValue,
                EffectiveEndDate = DateTime.MaxValue,
                RewardComputations = new List<RewardComputation>
                {
                    new()
                    {
                        Priority = 1,
                        RewardType = RewardType.Cashback,
                        PaymentTypes = new List<PaymentType> { PaymentType.Contactless },
                        Multiplier = 0.05M,
                        RewardsCap = 21.2765M,
                        MinSpendAmount = 600
                    },
                    new()
                    {
                        Priority = 2,
                        RewardType = RewardType.Cashback,
                        PaymentTypes = new List<PaymentType> { PaymentType.Online },
                        Multiplier = 0.05M,
                        RewardsCap = 21.2765M,
                        MinSpendAmount = 600
                    },
                    new()
                    {
                        Priority = 3,
                        RewardType = RewardType.Cashback,
                        Multiplier = 0.003M,
                        RewardsCap = 0,
                        MinSpendAmount = 0
                    }
                }
            }
        }
    };

    private static readonly BankCard FriendsAndFamily = new()
    {
        Bank = Bank.Maybank,
        Name = "Friends and Family",
        StatementType = StatementType.Calendar,
        TransactionDateType = TransactionDateType.Posted,
        RewardVersions = new List<RewardVersion>
        {
            new()
            {
                EffectiveStartDate = DateTime.MinValue,
                EffectiveEndDate = DateTime.MaxValue,
                RewardComputations = new List<RewardComputation>
                {
                    new()
                    {
                        Priority = 1,
                        RewardType = RewardType.Cashback,
                        TransactionCategories = new List<TransactionCategory> { TransactionCategory.Groceries },
                        Multiplier = 0.08M,
                        RewardsCap = 25,
                        MinSpendAmount = 800
                    },
                    new()
                    {
                        Priority = 2,
                        RewardType = RewardType.Cashback,
                        TransactionCategories = new List<TransactionCategory> { TransactionCategory.Transport, TransactionCategory.Petrol },
                        Multiplier = 0.08M,
                        RewardsCap = 25,
                        MinSpendAmount = 800
                    },
                    new()
                    {
                        Priority = 3,
                        RewardType = RewardType.Cashback,
                        TransactionCategories = new List<TransactionCategory>
                            { TransactionCategory.Dining, TransactionCategory.FoodDelivery },
                        Multiplier = 0.08M,
                        RewardsCap = 25,
                        MinSpendAmount = 800
                    },
                    new()
                    {
                        Priority = 4,
                        RewardType = RewardType.Cashback,
                        TransactionCategories = new List<TransactionCategory>
                            { TransactionCategory.Telco, TransactionCategory.OnlineTvStreaming },
                        Multiplier = 0.08M,
                        RewardsCap = 25,
                        MinSpendAmount = 800
                    },
                    new()
                    {
                        Priority = 5,
                        RewardType = RewardType.Cashback,
                        Multiplier = 0.003M,
                        RewardsCap = 0,
                        MinSpendAmount = 0
                    }
                }
            }
        }
    };

    public static readonly List<BankCard> BankCards = new()
    {
        LiveFresh,
        FriendsAndFamily
    };
}