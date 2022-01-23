using Crease.Domain.ValueObjects;

namespace Crease.Domain.Entities
{
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
    }
}