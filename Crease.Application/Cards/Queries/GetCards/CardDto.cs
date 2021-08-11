using Crease.Application.Common.Mappings;
using Crease.Domain.Entities;

namespace Crease.Application.Cards.Queries.GetCards
{
    public class CardDto : IMapFrom<Card>
    {
        public CardDto()
        {
        }
        
        public int Id { get; set; }
        
        public string Name { get; set; }
    }
}