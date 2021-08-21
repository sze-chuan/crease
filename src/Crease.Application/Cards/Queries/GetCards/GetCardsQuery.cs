using System.Collections.Generic;
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
    public class GetCardsQuery : IRequest<IEnumerable<CardDto>>
    {
    }

    public class GetCardsQueryHandler : IRequestHandler<GetCardsQuery, IEnumerable<CardDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        
        public GetCardsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CardDto>> Handle(GetCardsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Cards
                .AsNoTracking()
                .ProjectTo<CardDto>(_mapper.ConfigurationProvider)
                .OrderBy(t => t.Name)
                .ToListAsync(cancellationToken);
        }
    }
}