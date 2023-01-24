using Crease.WebUI.Data;
using Crease.WebUI.Models;
using Crease.WebUI.Services;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Crease.WebUI.Features.CardStatements;

public class CreateCardStatement : ControllerBase
{
    private readonly IMediator _mediator;

    public CreateCardStatement(IMediator mediator) => _mediator = mediator;

    [Route("/card-statements")]
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
            RuleFor(m => m.CardId).NotNull();
            RuleFor(m => m.BankCardId).NotNull();
            RuleFor(m => m.MonthYear).NotNull();
        }
    }

    public record Command : IRequest<Guid>
    {
        public Guid CardId { get; set; }
        
        public Guid BankCardId { get; set; }
        
        public DateTime MonthYear { get; set; }
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
            var statement = new CardStatement
            {
                BankCardId = message.BankCardId,
                CardId = message.CardId,
                
                UserId = _userService.UserId
            };

            await _db.CardStatements.AddAsync(statement, token);
            await _db.SaveChangesAsync(token);

            return statement.Id;
        }
    }
}