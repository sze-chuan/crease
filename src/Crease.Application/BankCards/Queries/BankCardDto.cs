using Crease.Application.Common.Mappings;
using Crease.Domain.Entities;
using Crease.Domain.ValueObjects;

namespace Crease.Application.BankCards.Queries;

public class BankCardDto : IMapFrom<BankCard>
{
    public string Id { get; set; }
        
    public string Name { get; set; }
        
    public Bank Bank { get; set;}
        
    public StatementType StatementType { get; set; }
        
    public TransactionDateType TransactionDateType { get; set; }
}