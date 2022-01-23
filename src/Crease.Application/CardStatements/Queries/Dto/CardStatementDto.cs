using Crease.Application.Common.Mappings;
using Crease.Domain.Entities;
using Crease.Domain.ValueObjects;

namespace Crease.Application.CardStatements.Queries.Dto;

public class CardStatementDto : IMapFrom<CardStatement>
{
    public CardStatementDto()
    {
        Transactions = new List<TransactionDto>();
    }
        
    public string Id { get; set; }
        
    public string MonthYear { get; set; }
        
    public CardStatementReward StatementReward { get; set; }
        
    public IList<TransactionDto> Transactions { get; set; }
}