using System;
using Crease.Domain.Common;

namespace Crease.Domain.Entities
{
    public class Card : Entity
    {
        public int BankCardId { get; set; }

        public string Name { get; set; }
        
        public string UserId { get; set; }
        
        public string CardNumber { get; set; }
        
        public DateTime StartDate { get; set; }
    }
}