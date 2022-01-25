using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using MediatR;

namespace Crease.Application.Cards.Commands.CreateCard;

public class CreateCardCommand : IRequest<string>
{
    public string? BankCardId { get; set; }
        
    public string Name { get; set; }
        
    public string CardNumber { get; set; }
        
    public DateTime StartDate { get; set; }
}

public class CreateCardCommandHandler : IRequestHandler<CreateCardCommand, string>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _userService;

    public CreateCardCommandHandler(IApplicationDbContext context, ICurrentUserService userService)
    {
        _context = context;
        _userService = userService;
    }

    public async Task<string> Handle(CreateCardCommand request, CancellationToken cancellationToken)
    {
        var entity = new Card
        {
            BankCardId = request.BankCardId,
            Name = request.Name,
            CardNumber = request.CardNumber,
            StartDate = request.StartDate,
            UserId = _userService.UserId
        };
            
        _context.Cards.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id.ToString();
    }
}