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
            var entity = await _context.Transactions.FindAsync(new object[] { Guid.Parse(request.Id) }, cancellationToken);
            
            if (entity == null)
            {
                throw new NotFoundException(nameof(Transaction), request.Id);
            }

            _context.Transactions.Remove(entity);
            
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}