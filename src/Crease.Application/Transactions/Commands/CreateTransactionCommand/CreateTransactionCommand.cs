using System;
using System.Threading;
using System.Threading.Tasks;
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
            var entity = new Transaction
            {
                CardStatementId = request.CardStatementId,
                PaymentType = PaymentType.From(request.PaymentType),
                TransactionCategory = TransactionCategory.From(request.TransactionCategory),
                Description = request.Description,
                Date = request.Date,
                Amount = request.Amount
            };
            
            _context.Transactions.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id.ToString();
        }
    }
}