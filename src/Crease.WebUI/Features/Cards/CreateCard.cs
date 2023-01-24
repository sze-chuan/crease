using Crease.WebUI.Data;
using Crease.WebUI.Models;
using Crease.WebUI.Services;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Crease.WebUI.Features.Cards;

public class CreateCard : ControllerBase
{
    private readonly IMediator _mediator;

    public CreateCard(IMediator mediator) => _mediator = mediator;

    [Route("/cards")]
    [Authorize]
    [HttpPost]
    [SwaggerResponse(201, typeof(Guid))]
    [SwaggerResponse(400, null)]
    public async Task<ActionResult<Guid>> Create([FromBody] Command message)
    {
        return Created((string)null, await _mediator.Send(message));
    }

    public class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(m => m.Name).NotNull().Length(1, 50);
            RuleFor(m => m.BankCardId).NotNull();
            RuleFor(m => m.StartDate).NotNull();
            RuleFor(m => m.CardNumber).Length(4);
        }
    }

    public record Command : IRequest<Guid>
    {
        public Guid BankCardId { get; set; }
        public string Name { get; set; }
        public string CardNumber { get; set; }
        public DateTime StartDate { get; set; }
    }

    public class Handler : IRequestHandler<Command, Guid>
    {
        private readonly ApplicationDbContext _db;
        private readonly ICurrentUserService _userService;

        public Handler(ApplicationDbContext db, ICurrentUserService userService)
        {
            _db = db;
            _userService = userService;
        }

        public async Task<Guid> Handle(Command message, CancellationToken token)
        {
            var card = new Card
            {
                BankCardId = message.BankCardId,
                Name = message.Name,
                CardNumber = message.CardNumber,
                StartDate = message.StartDate,
                UserId = _userService.UserId
            };

            await _db.Cards.AddAsync(card, token);
            await _db.SaveChangesAsync(token);

            return card.Id;
        }
    }
}