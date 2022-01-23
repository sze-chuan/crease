using AutoMapper;
using AutoMapper.QueryableExtensions;
using Crease.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Crease.Application.Cards.Queries.GetCards;

public class GetCardsQuery : IRequest<IEnumerable<CardDto>>
{
}

public class GetCardsQueryHandler : IRequestHandler<GetCardsQuery, IEnumerable<CardDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _userService;
        
    public GetCardsQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService userService)
    {
        _context = context;
        _mapper = mapper;
        _userService = userService;
    }

    public async Task<IEnumerable<CardDto>> Handle(GetCardsQuery request, CancellationToken cancellationToken)
    {
        return await _context.Cards
            .Where(card => card.UserId == _userService.UserId)
            .AsNoTracking()
            .ProjectTo<CardDto>(_mapper.ConfigurationProvider)
            .OrderBy(t => t.Name)
            .ToListAsync(cancellationToken);
    }
}