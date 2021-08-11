using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Crease.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Crease.Application.Cards.Queries.GetCards
{
    public class GetCardsQuery : IRequest<CardsVm>
    {
    }

    public class GetCardsQueryHandler : IRequestHandler<GetCardsQuery, CardsVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        
        public GetCardsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CardsVm> Handle(GetCardsQuery request, CancellationToken cancellationToken)
        {
            return new CardsVm
            {
                Cards = await _context.Cards
                    .AsNoTracking()
                    .ProjectTo<CardDto>(_mapper.ConfigurationProvider)
                    .OrderBy(t => t.Name)
                    .ToListAsync(cancellationToken)
            };
        }
    }
}