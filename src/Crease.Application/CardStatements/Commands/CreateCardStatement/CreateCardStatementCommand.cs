using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using MediatR;

namespace Crease.Application.CardStatements.Commands.CreateCardStatement
{
    public class CreateCardStatementCommand : IRequest<string>
    {
        public string CardId { get; set; }
        
        public string BankCardId { get; set; }
        
        public DateTime MonthYear { get; set; }
    }

    public class CreateCardStatementCommandHandler : IRequestHandler<CreateCardStatementCommand, string>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _userService;

        public CreateCardStatementCommandHandler(IApplicationDbContext context, ICurrentUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        public async Task<string> Handle(CreateCardStatementCommand request, CancellationToken cancellationToken)
        {
            var entity = new CardStatement
            {
                CardId = request.CardId,
                BankCardId = request.BankCardId,
                MonthYear = request.MonthYear,
                UserId = _userService.UserId
            };

            _context.CardStatements.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id.ToString();
        }
    }
}