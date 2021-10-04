using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Crease.Application.CardStatements.Queries.Dto;
using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using MediatR;

namespace Crease.Application.CardStatements.Queries.GetCardStatement
{
    public class GetCardStatementQuery : IRequest<CardStatementDto>
    {
        public string CardStatementId { get; set; }

        public GetCardStatementQuery(string cardStatementId)
        {
            CardStatementId = cardStatementId;
        }
    }

    public class GetCardStatementQueryHandler : IRequestHandler<GetCardStatementQuery, CardStatementDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _userService;

        public GetCardStatementQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService userService)
        {
            _context = context;
            _mapper = mapper;
            _userService = userService;
        }

        public async Task<CardStatementDto> Handle(GetCardStatementQuery request, CancellationToken cancellationToken)
        {
            var cardStatement =
                await _context.CardStatements.FindAsync(new object[] { Guid.Parse(request.CardStatementId) }, cancellationToken);

            if (cardStatement == null || cardStatement.UserId != _userService.UserId)
            {
                return null;
            }

            return _mapper.Map<CardStatement, CardStatementDto>(cardStatement);
        }
    }
}