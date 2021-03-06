using Crease.Application.Common.Exceptions;
using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using Crease.Domain.ValueObjects;
using MediatR;

namespace Crease.Application.Transactions.Commands.UpdateTransactionCommand;

public class UpdateTransactionCommand : IRequest
{
    public string Id { get; set; }
        
    public string CardStatementId { get; set; }
        
    public string PaymentType { get; set; }
        
    public string TransactionCategory { get; set; }
        
    public string Description { get; set; }
        
    public DateTime Date { get; set; }
        
    public decimal Amount { get; set; }
}

public class UpdateTransactionCommandHandler : IRequestHandler<UpdateTransactionCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _userService;

    public UpdateTransactionCommandHandler(IApplicationDbContext context, ICurrentUserService userService)
    {
        _context = context;
        _userService = userService;
    }

    public async Task<Unit> Handle(UpdateTransactionCommand request, CancellationToken cancellationToken)
    {
        var cardStatement = await _context.CardStatements.FindAsync(new object[] { Guid.Parse(request.CardStatementId) }, cancellationToken);

        if (cardStatement == null || cardStatement.UserId != _userService.UserId)
        {
            throw new NotFoundException(nameof(Transaction), request.Id);
        }
            
        var bankCard =
            await _context.BankCards.FindAsync(new object[] { Guid.Parse(cardStatement.BankCardId) }, cancellationToken);
            
        cardStatement.UpdateTransaction(new Transaction
        {
            Id = Guid.Parse(request.Id),
            Amount = request.Amount,
            Description = request.Description,
            Date = request.Date,
            PaymentType = PaymentType.From(request.PaymentType),
            TransactionCategory = TransactionCategory.From(request.TransactionCategory)
        });

        cardStatement.UpdateStatementReward(bankCard.GetEffectiveRewardVersion(cardStatement.MonthYear));
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}