using Crease.Domain.Extensions;
using Crease.WebUI.Models.ValueObjects;

namespace Crease.WebUI.Models;

public class BankCard
{
    public Guid Id { get; set; }
        
    public Bank Bank { get; set; }
        
    public string Name { get; set; }
        
    public StatementType StatementType { get; set; }
        
    public TransactionDateType TransactionDateType { get; set; }
        
    public List<RewardVersion> RewardVersions { get; set; }

    public RewardVersion GetEffectiveRewardVersion(DateTime statementMonthYear)
    {
        return RewardVersions.Find(version =>
            version.EffectiveStartDate <= statementMonthYear && version.EffectiveEndDate >= statementMonthYear);
    }

    public DateTime GetStatementMonthYearOnTransactionDate(DateTime transactionDate)
    {
        if (StatementType.Equals(StatementType.Calendar))
        {
            return new DateTime(transactionDate.Year, transactionDate.Month, 1).ToUtcTimeFormat();
        }
        
        //TODO: Handle statement type of statement
   
        return DateTime.Now;
    }
}