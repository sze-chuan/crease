using System;
using System.Threading;
using System.Threading.Tasks;
using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using MediatR;

namespace Crease.Application.CardStatements.Commands.CreateCardStatement
{
    public class CreateCardStatementCommand : IRequest<int>
    {
        public int CardId { get; set; }
        
        public DateTime MonthYear { get; set; }
    }

    public class CreateCardStatementCommandHander : IRequestHandler<CreateCardStatementCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreateCardStatementCommandHander(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateCardStatementCommand request, CancellationToken cancellationToken)
        {
            var entity = new CardStatement
            {
                CardId = request.CardId,
                MonthYear = request.MonthYear
            };
            
            _context.CardStatements.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}