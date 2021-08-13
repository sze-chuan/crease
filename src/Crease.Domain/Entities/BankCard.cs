using Crease.Domain.Enums;

namespace Crease.Domain.Entities
{
    public class BankCard
    {
        public int BankCardId { get; set; }

        public Bank Bank { get; set; }
        
        public string Name { get; set; } 
    }
}