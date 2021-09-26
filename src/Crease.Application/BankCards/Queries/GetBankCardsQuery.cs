using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Crease.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Crease.Application.BankCards.Queries
{
    public class GetBankCardsQuery : IRequest<IEnumerable<BankCardDto>>
    {
    }

    public class GetBankCardsQueryHandler : IRequestHandler<GetBankCardsQuery, IEnumerable<BankCardDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetBankCardsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BankCardDto>> Handle(GetBankCardsQuery request, CancellationToken cancellationToken)
        {
            return await _context.BankCards
                .AsNoTracking()
                .ProjectTo<BankCardDto>(_mapper.ConfigurationProvider)
                .OrderBy(t => t.Name)
                .ToListAsync(cancellationToken);
        }
    }
}