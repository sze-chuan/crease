using Crease.WebUI.Data;
using Crease.WebUI.Models;
using Crease.WebUI.Services;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Crease.WebUI.Features.CardStatements;

public class CreateCardStatement : ApiControllerBase
{
    [Consumes("application/json")]
    [Produces("application/json")]
    [Route("/card-statements")]
    [Authorize]
    [HttpPost]
    [SwaggerResponse(201, typeof(Guid))]
    [SwaggerResponse(400, null)]
    public async Task<ActionResult<Guid>> Create([FromBody] CreateCardStatementRequest message)
    {
        return Created("/card-statements", await Mediator.Send(message));
    }

    public class Validator : AbstractValidator<CreateCardStatementRequest>
    {
        public Validator()
        {
            RuleFor(m => m.CardId).NotEmpty();
            RuleFor(m => m.BankCardId).NotEmpty();
            RuleFor(m => m.MonthYear).NotEmpty();
        }
    }

    public record CreateCardStatementRequest : IRequest<Guid>
    {
        public Guid CardId { get; set; }
        
        public Guid BankCardId { get; set; }
        
        public DateTime MonthYear { get; set; }
    }

    public class Handler : IRequestHandler<CreateCardStatementRequest, Guid>
    {
        private readonly ApplicationDbContext _db;
        private readonly ICurrentUserService _userService;

        public Handler(ApplicationDbContext db, ICurrentUserService userService)
        {
            _db = db;
            _userService = userService;
        }

        public async Task<Guid> Handle(CreateCardStatementRequest message, CancellationToken token)
        {
            var statement = new CardStatement
            {
                BankCardId = message.BankCardId,
                CardId = message.CardId,
                MonthYear = message.MonthYear,
                UserId = _userService.UserId
            };

            await _db.CardStatements.AddAsync(statement, token);
            await _db.SaveChangesAsync(token);

            return statement.Id;
        }
    }
}