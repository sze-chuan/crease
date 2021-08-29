using System;
using System.Threading;
using System.Threading.Tasks;
using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using MediatR;

namespace Crease.Application.CardStatements.Commands.CreateCardStatement
{
    public class CreateCardStatementCommand : IRequest<string>
    {
        public string CardId { get; set; }
        
        public DateTime MonthYear { get; set; }
    }

    public class CreateCardStatementCommandHandler : IRequestHandler<CreateCardStatementCommand, string>
    {
        private readonly IApplicationDbContext _context;

        public CreateCardStatementCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<string> Handle(CreateCardStatementCommand request, CancellationToken cancellationToken)
        {
            var entity = new CardStatement
            {
                CardId = request.CardId,
                MonthYear = request.MonthYear
            };
            
            _context.CardStatements.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id.ToString();
        }
    }
}