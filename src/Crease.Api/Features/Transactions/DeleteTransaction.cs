using Crease.WebUI.Data;
using Crease.WebUI.Exceptions;
using Crease.WebUI.Services;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web.Resource;
using NSwag.Annotations;

namespace Crease.WebUI.Features.Transactions;

public class DeleteTransaction : ApiControllerBase
{
    [Route("card-statements/{cardStatementId}/transactions/{id}")]
    [RequiredScope(Constants.Scopes.TransactionDelete)]
    [HttpDelete]
    [SwaggerResponse(204, null)]
    [SwaggerResponse(404, null)]
    public async Task<ActionResult<Guid>> Create(Guid cardStatementId, Guid id)
    {
        await Mediator.Send(new Command
        {
            Id = id,
            CardStatementId = cardStatementId
        });
        
        return NoContent();
    }

    public record Command : IRequest
    {
        public Guid Id { get; set; }
        public Guid CardStatementId { get; set; }
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
            var statement = await _db.CardStatements
                .Where(statement => statement.Id == message.CardStatementId && statement.UserId == _userService.UserId)
                .SingleOrDefaultAsync(token);

            if (statement == null)
            {
                throw new HttpResponseException(404, "Card statement not found.");
            }
            
            var bankCard =
                await _db.BankCards.FindAsync(new object[] { statement.BankCardId }, token);
            
            if (!statement.RemoveTransaction(message.Id))
            {
                throw new HttpResponseException(404, "Transaction not found.");
            }
            
            statement.UpdateStatementReward(bankCard.GetEffectiveRewardVersion(statement.MonthYear));
            await _db.SaveChangesAsync(token);

            return Unit.Value;
        }
    }
}