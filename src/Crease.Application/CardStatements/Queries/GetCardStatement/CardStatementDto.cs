using System.Collections.Generic;
using Crease.Application.Common.Mappings;
using Crease.Domain.Entities;

namespace Crease.Application.CardStatements.Queries.GetCardStatement
{
    public class CardStatementDto : IMapFrom<CardStatement>
    {
        public CardStatementDto()
        {
            Transactions = new List<TransactionDto>();
        }
        
        public int Id { get; set; }
        
        public string MonthYear { get; set; }
        
        public IList<TransactionDto> Transactions { get; set; }
    }
}