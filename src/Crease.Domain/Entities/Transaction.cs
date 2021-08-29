using System;
using Crease.Domain.Common;
using Crease.Domain.ValueObjects;

namespace Crease.Domain.Entities
{
    public class Transaction : Entity
    {
        public string CardStatementId { get; set; }
        
        public PaymentType PaymentType { get; set; }
        
        public TransactionCategory TransactionCategory { get; set; }
        
        public string Description { get; set; }
        
        public DateTime Date { get; set; }
        
        public decimal Amount { get; set; }
    }
}