using AutoMapper;
using Crease.WebUI.Models;
using Crease.WebUI.Models.ValueObjects;

namespace Crease.WebUI.Features.CardStatements;

public record CardStatementDto
{
    public string Id { get; set; }
        
    public DateTime MonthYear { get; set; }
        
    public CardStatementReward StatementReward { get; set; }
        
    public List<TransactionDto> Transactions { get; set; } = new();

    public record TransactionDto
    {
        public string Id { get; set; }
        
        public string CardStatementId { get; set; }
        
        public string PaymentType { get; set; }
        
        public string TransactionCategory { get; set; }
        
        public string Description { get; set; }
        
        public DateTime Date { get; set; }
        
        public decimal Amount { get; set; }
    }
}

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateProjection<CardStatement, CardStatementDto>();
        CreateProjection<Transaction, CardStatementDto.TransactionDto>();
    }
}