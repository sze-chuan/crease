using System;
using Crease.Application.Common.Mappings;
using Crease.Domain.Entities;

namespace Crease.Application.CardStatements.Queries.GetCardStatement
{
    public class TransactionDto : IMapFrom<Transaction>
    {
        public TransactionDto()
        {
        }
        
        public int Id { get; set; }
        
        public int CardStatementId { get; set; }
        
        public string PaymentType { get; set; }
        
        public string PaymentTypeCategory { get; set; }
        
        public string Description { get; set; }
        
        public DateTime Date { get; set; }
        
        public decimal Amount { get; set; }
    }
}