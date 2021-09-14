using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Crease.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Crease.Application.CardStatements.Queries.GetCardStatement
{
    public class GetCardStatementQuery : IRequest<CardStatementDto>
    {
        public string CardId { get; set; }

        public DateTime MonthYear { get; set; }
    }

    public class GetCardStatementQueryHandler : IRequestHandler<GetCardStatementQuery, CardStatementDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetCardStatementQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CardStatementDto> Handle(GetCardStatementQuery request, CancellationToken cancellationToken)
        {
            return await _context.CardStatements
                .Where(x => x.CardId == Guid.Parse(request.CardId) && x.MonthYear == request.MonthYear)
                .AsNoTracking()
                .ProjectTo<CardStatementDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(cancellationToken);
        }
    }
}