using System;
using System.Threading;
using System.Threading.Tasks;
using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using MediatR;

namespace Crease.Application.Cards.Commands.CreateCard
{
    public class CreateCardCommand : IRequest<string>
    {
        public int BankCardId { get; set; }
        
        public string Name { get; set; }
        
        public string CardNumber { get; set; }
        
        public DateTime StartDate { get; set; }
    }

    public class CreateCardCommandHandler : IRequestHandler<CreateCardCommand, string>
    {
        private readonly IApplicationDbContext _context;

        public CreateCardCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<string> Handle(CreateCardCommand request, CancellationToken cancellationToken)
        {
            var entity = new Card
            {
                BankCardId = request.BankCardId,
                Name = request.Name,
                CardNumber = request.CardNumber,
                StartDate = request.StartDate
            };
            
            _context.Cards.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id.ToString();
        }
    }
}