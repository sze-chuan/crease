using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Crease.Application.Cards.Queries.GetCards;
using Crease.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Crease.Application.Cards.Queries.GetCard
{
    public class GetCardQuery : IRequest<CardDto>
    {
        public GetCardQuery(int cardId)
        {
            CardId = cardId;
        }
        
        public int CardId { get; }
    }

    public class GetCardQueryHandler : IRequestHandler<GetCardQuery, CardDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        
        public GetCardQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CardDto> Handle(GetCardQuery request, CancellationToken cancellationToken)
        {
            return await _context.Cards
                .Where(x => x.Id == request.CardId)
                .ProjectTo<CardDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(cancellationToken);
        }
    }
}