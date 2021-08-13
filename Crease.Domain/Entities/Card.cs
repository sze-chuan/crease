using System;

namespace Crease.Domain.Entities
{
    public class Card
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public int BankCardId { get; set; }
        
        public DateTime StartDate { get; set; }
    }
}