using Crease.Application.Common.Mappings;
using Crease.Domain.Entities;

namespace Crease.Application.CardStatements.Queries.Dto;

public class TransactionDto : IMapFrom<Transaction>
{
    public string Id { get; set; }
        
    public string CardStatementId { get; set; }
        
    public string PaymentType { get; set; }
        
    public string TransactionCategory { get; set; }
        
    public string Description { get; set; }
        
    public DateTime Date { get; set; }
        
    public decimal Amount { get; set; }
}