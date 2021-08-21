using Crease.Domain.Common;
using Crease.Domain.ValueObjects;

namespace Crease.Domain.Entities
{
    public class BankCard : Entity
    {
        public Bank Bank { get; set; }
        
        public string Name { get; set; } 
    }
}