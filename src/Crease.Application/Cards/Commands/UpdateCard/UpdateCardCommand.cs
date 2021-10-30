using System;
using System.Threading;
using System.Threading.Tasks;
using Crease.Application.Common.Exceptions;
using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using MediatR;

namespace Crease.Application.Cards.Commands.UpdateCard
{
    public class UpdateCardCommand : IRequest
    {
        public string Id { get; set; }
        
        public string Name { get; set; }
        
        public string CardNumber { get; set; }
        
        public DateTime StartDate { get; set; }
    }

    public class UpdateCardCommandHandler : IRequestHandler<UpdateCardCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _userService;

        public UpdateCardCommandHandler(IApplicationDbContext context, ICurrentUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        public async Task<Unit> Handle(UpdateCardCommand request, CancellationToken cancellationToken)
        {
            var card = await _context.Cards.FindAsync(new object[] { Guid.Parse(request.Id) }, cancellationToken);

            if (card == null || card.UserId != _userService.UserId)
            {
                throw new NotFoundException(nameof(Card), request.Id);
            }

            card.Name = request.Name;
            card.CardNumber = request.CardNumber;
            card.StartDate = request.StartDate;
            
            await _context.SaveChangesAsync(cancellationToken);
            
            return Unit.Value;
        }
    }
}