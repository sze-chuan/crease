using System;
using System.Threading;
using System.Threading.Tasks;
using Crease.Application.Common.Exceptions;
using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using MediatR;

namespace Crease.Application.Transactions.Commands.DeleteTransactionCommand
{
    public class DeleteTransactionCommand : IRequest
    {
        public string Id { get; set; }
        
        public string CardStatementId { get; set; }
    }

    public class DeleteTransactionCommandHandler : IRequestHandler<DeleteTransactionCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteTransactionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteTransactionCommand request, CancellationToken cancellationToken)
        {
            var cardStatement =
                await _context.CardStatements.FindAsync(new object[] { Guid.Parse(request.CardStatementId) }, cancellationToken);

            if (cardStatement == null)
            {
                throw new NotFoundException(nameof(CardStatement), request.CardStatementId);
            }

            cardStatement.RemoveTransaction(Guid.Parse(request.Id));
            
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}