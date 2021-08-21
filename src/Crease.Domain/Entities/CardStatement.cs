using System;
using Crease.Domain.Common;

namespace Crease.Domain.Entities
{
    public class CardStatement : Entity
    {
        public DateTime MonthYear { get; set; }
        
        public int CardId { get; }
    }
}