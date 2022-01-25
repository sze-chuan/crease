using Crease.Application.Common.Exceptions;
using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using MediatR;

namespace Crease.Application.Transactions.Commands.DeleteTransactionCommand;

public class DeleteTransactionCommand : IRequest
{
    public string Id { get; set; }
        
    public string CardStatementId { get; set; }
}

public class DeleteTransactionCommandHandler : IRequestHandler<DeleteTransactionCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _userService;

    public DeleteTransactionCommandHandler(IApplicationDbContext context, ICurrentUserService userService)
    {
        _context = context;
        _userService = userService;
    }

    public async Task<Unit> Handle(DeleteTransactionCommand request, CancellationToken cancellationToken)
    {
        var cardStatement =
            await _context.CardStatements.FindAsync(new object[] { Guid.Parse(request.CardStatementId) }, cancellationToken);

        if (cardStatement == null || cardStatement.UserId != _userService.UserId)
        {
            throw new NotFoundException(nameof(CardStatement), request.CardStatementId);
        }
            
        var bankCard =
            await _context.BankCards.FindAsync(new object[] { Guid.Parse(cardStatement.BankCardId) }, cancellationToken);

        cardStatement.RemoveTransaction(Guid.Parse(request.Id));
        cardStatement.UpdateStatementReward(bankCard.GetEffectiveRewardVersion(cardStatement.MonthYear));
            
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}