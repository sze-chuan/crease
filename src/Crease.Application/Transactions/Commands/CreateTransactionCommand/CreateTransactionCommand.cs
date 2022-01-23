using Crease.Application.Common.Exceptions;
using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using Crease.Domain.ValueObjects;
using MediatR;

namespace Crease.Application.Transactions.Commands.CreateTransactionCommand
{
    public class CreateTransactionCommand : IRequest<string>
    {
        public string CardStatementId { get; set; }
        
        public string PaymentType { get; set; }
        
        public string TransactionCategory { get; set; }
        
        public string Description { get; set; }
        
        public DateTime Date { get; set; }
        
        public decimal Amount { get; set; }
    }

    public class CreateTransactionCommandHandler : IRequestHandler<CreateTransactionCommand, string>
    {
        private readonly IApplicationDbContext _context;

        public CreateTransactionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<string> Handle(CreateTransactionCommand request, CancellationToken cancellationToken)
        {
            var cardStatement =
                await _context.CardStatements.FindAsync(new object[] { Guid.Parse(request.CardStatementId) }, cancellationToken);

            if (cardStatement == null)
            {
                throw new NotFoundException(nameof(CardStatement), request.CardStatementId);
            }

            var bankCard =
                await _context.BankCards.FindAsync(new object[] { Guid.Parse(cardStatement.BankCardId) }, cancellationToken);

            var transactionEntity = new Transaction
            {
                Id = Guid.NewGuid(),
                PaymentType = PaymentType.From(request.PaymentType),
                TransactionCategory = TransactionCategory.From(request.TransactionCategory),
                Description = request.Description,
                Date = request.Date,
                Amount = request.Amount
            };

            cardStatement.Transactions.Add(transactionEntity);
            cardStatement.UpdateStatementReward(bankCard.GetEffectiveRewardVersion(cardStatement.MonthYear));

            await _context.SaveChangesAsync(cancellationToken);

            return transactionEntity.Id.ToString();
        }
    }
}