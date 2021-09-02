using Crease.Domain.ValueObjects;

namespace Crease.Domain.Entities
{
    public class BankCard
    {
        public int Id { get; set; }
        
        public Bank Bank { get; set; }
        
        public string Name { get; set; } 
    }
}