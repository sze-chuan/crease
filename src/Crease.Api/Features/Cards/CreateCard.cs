using Crease.WebUI.Data;
using Crease.WebUI.Models;
using Crease.WebUI.Services;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using NSwag.Annotations;

namespace Crease.WebUI.Features.Cards;

public class CreateCard : ApiControllerBase
{
    [Route("/cards")]
    [RequiredScope(Constants.Scopes.CardWrite)]
    [HttpPost]
    [SwaggerResponse(201, typeof(Guid))]
    [SwaggerResponse(400, null)]
    public async Task<ActionResult<Guid>> Create([FromBody] CreateCardRequest message)
    {
        return Created("/cards", await Mediator.Send(message));
    }

    public class Validator : AbstractValidator<CreateCardRequest>
    {
        public Validator()
        {
            RuleFor(m => m.Name).NotEmpty().Length(1, 50);
            RuleFor(m => m.BankCardId).NotEmpty();
            RuleFor(m => m.StartDate).NotEmpty();
            RuleFor(m => m.CardNumber).Length(4);
        }
    }

    public record CreateCardRequest : IRequest<Guid>
    {
        public Guid BankCardId { get; set; }
        public string Name { get; set; }
        public string CardNumber { get; set; }
        public DateTime StartDate { get; set; }
    }

    public class Handler : IRequestHandler<CreateCardRequest, Guid>
    {
        private readonly ApplicationDbContext _db;
        private readonly ICurrentUserService _userService;

        public Handler(ApplicationDbContext db, ICurrentUserService userService)
        {
            _db = db;
            _userService = userService;
        }

        public async Task<Guid> Handle(CreateCardRequest message, CancellationToken token)
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