using Crease.WebUI.Models.Common;
using Crease.WebUI.Models.ValueObjects;

namespace Crease.WebUI.Models;

public class Transaction : Entity
{
    public Guid CardStatementId { get; set; }
        
    public PaymentType PaymentType { get; set; }
        
    public TransactionCategory TransactionCategory { get; set; }
        
    public string Description { get; set; }
        
    public DateTime Date { get; set; }
        
    public decimal Amount { get; set; }
}