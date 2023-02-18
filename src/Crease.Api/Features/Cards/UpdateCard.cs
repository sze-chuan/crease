using Crease.WebUI.Data;
using Crease.WebUI.Exceptions;
using Crease.WebUI.Models;
using Crease.WebUI.Services;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Crease.WebUI.Features.Cards;

public class UpdateCard : ApiControllerBase
{
    [Route("/cards/{id}")]
    [Authorize]
    [HttpPut]
    [SwaggerResponse(204, null)]
    [SwaggerResponse(400, null)]
    [SwaggerResponse(404, null)]
    public async Task<ActionResult<Guid>> Update(Guid id, Command message)
    {
        if (id != message.Id)
        {
            return BadRequest();
        }

        await Mediator.Send(message);
        return NoContent();
    }

    public class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(m => m.Id).NotEmpty();
            RuleFor(m => m.Name).NotEmpty().Length(1, 50);
            RuleFor(m => m.BankCardId).NotEmpty();
            RuleFor(m => m.StartDate).NotEmpty();
            RuleFor(m => m.CardNumber).Length(4);
        }
    }
    
    public record Command : IRequest
    {
        public Guid Id { get; set; }
        public Guid BankCardId { get; set; }
        public string Name { get; set; }
        public string CardNumber { get; set; }
        public DateTime StartDate { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly ApplicationDbContext _db;
        private readonly ICurrentUserService _userService;

        public Handler(ApplicationDbContext db, ICurrentUserService userService)
        {
            _db = db;
            _userService = userService;
        }

        public async Task<Unit> Handle(Command message, CancellationToken token)
        {
            var card = await _db.Cards.FindAsync(new object[] { message.Id }, cancellationToken: token);

            if (card == null)
            {
                throw new HttpResponseException(404, "Card cannot be found.");
            }
            
            card.Name = message.Name;
            card.CardNumber = message.CardNumber;
            card.StartDate = message.StartDate;
            
            await _db.SaveChangesAsync(token);

            return Unit.Value;
        }
    }
}