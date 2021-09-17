using System;
using System.Collections.Generic;
using System.Linq;
using Crease.Domain.Common;

namespace Crease.Domain.Entities
{
    public class CardStatement : Entity
    {
        public DateTime MonthYear { get; set; }
        
        public Guid CardId { get; set; }
        
        public string UserId { get; set; }
        
        public List<Transaction> Transactions { get; private set; } = new();

        public void UpdateTransaction(Transaction updatedTransaction)
        {
            var transactionToBeUpdated = Transactions.FirstOrDefault(transaction => transaction.Id == updatedTransaction.Id);

            if (transactionToBeUpdated == null)
            {
                return;
            }
            
            transactionToBeUpdated.Amount = updatedTransaction.Amount;
            transactionToBeUpdated.Date = updatedTransaction.Date;
            transactionToBeUpdated.Description = updatedTransaction.Description;
            transactionToBeUpdated.PaymentType = updatedTransaction.PaymentType;
            transactionToBeUpdated.TransactionCategory = updatedTransaction.TransactionCategory;
        }

        public void RemoveTransaction(Guid transactionId)
        {
            Transactions.RemoveAll(transaction => transaction.Id == transactionId);
        }
    }
}