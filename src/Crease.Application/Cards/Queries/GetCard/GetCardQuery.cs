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
        public GetCardQuery(string cardId)
        {
            CardId = cardId;
        }

        public string CardId { get; }
    }

    public class GetCardQueryHandler : IRequestHandler<GetCardQuery, CardDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _userService;

        public GetCardQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService userService)
        {
            _context = context;
            _mapper = mapper;
            _userService = userService;
        }

        public async Task<CardDto> Handle(GetCardQuery request, CancellationToken cancellationToken)
        {
            return await _context.Cards
                .Where(x => x.Id == Guid.Parse(request.CardId) && x.UserId == _userService.UserId)
                .ProjectTo<CardDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(cancellationToken);
        }
    }
}