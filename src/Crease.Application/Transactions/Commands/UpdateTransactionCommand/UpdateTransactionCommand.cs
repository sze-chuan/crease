using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Crease.Application.Common.Exceptions;
using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using Crease.Domain.ValueObjects;
using MediatR;

namespace Crease.Application.Transactions.Commands.UpdateTransactionCommand
{
    public class UpdateTransactionCommand : IRequest
    {
        public string Id { get; set; }
        
        public string PaymentType { get; set; }
        
        public string TransactionCategory { get; set; }
        
        public string Description { get; set; }
        
        public DateTime Date { get; set; }
        
        public decimal Amount { get; set; }
    }

    public class UpdateTransactionCommandHandler : IRequestHandler<UpdateTransactionCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdateTransactionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdateTransactionCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Transactions.FindAsync(new object[] { Guid.Parse(request.Id) }, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Transaction), request.Id);
            }

            entity.Description = request.Description;
            entity.PaymentType = PaymentType.From(request.PaymentType);
            entity.TransactionCategory = TransactionCategory.From(request.TransactionCategory);
            entity.Date = request.Date;
            entity.Amount = request.Amount;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}