using AutoMapper;
using AutoMapper.QueryableExtensions;
using Crease.Application.CardStatements.Queries.Dto;
using Crease.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Crease.Application.CardStatements.Queries.GetCardStatementByMonthYear;

public class GetCardStatementByMonthYearQuery : IRequest<CardStatementDto>
{
    public string CardId { get; set; }

    public DateTime MonthYear { get; set; }
}

public class GetCardStatementByMonthYearQueryHandler : IRequestHandler<GetCardStatementByMonthYearQuery, CardStatementDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _userService;

    public GetCardStatementByMonthYearQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService userService)
    {
        _context = context;
        _mapper = mapper;
        _userService = userService;
    }

    public async Task<CardStatementDto> Handle(GetCardStatementByMonthYearQuery request, CancellationToken cancellationToken)
    {
        return await _context.CardStatements
            .Where(x => x.CardId == request.CardId && x.MonthYear == request.MonthYear && x.UserId == _userService.UserId)
            .AsNoTracking()
            .ProjectTo<CardStatementDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(cancellationToken);
    }
}