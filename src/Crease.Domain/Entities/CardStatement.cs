using System;
using System.Collections.Generic;
using Crease.Domain.Common;

namespace Crease.Domain.Entities
{
    public class CardStatement : Entity
    {
        public DateTime MonthYear { get; set; }
        
        public string CardId { get; set; }
        
        public IList<Transaction> Transactions { get; private set; } = new List<Transaction>();
    }
}