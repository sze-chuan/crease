using Crease.Application.Transactions.Commands.CreateTransactionCommand;
using Crease.Application.Transactions.Commands.DeleteTransactionCommand;
using Crease.Application.Transactions.Commands.UpdateTransactionCommand;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Crease.WebUI.Controllers
{
    [Authorize]
    [Route("api/cardstatements/{cardStatementId}/transactions")]
    public class TransactionsController : ApiControllerBase
    {
        [HttpPost]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<string>> Create(string cardStatementId, [FromBody] CreateTransactionCommand command)
        {
            if (cardStatementId != command.CardStatementId)
            {
                return BadRequest();
            }
            
            return Ok(await Mediator.Send(command));
        }
        
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Update(string id, string cardStatementId, UpdateTransactionCommand command)
        {
            if (id != command.Id || cardStatementId != command.CardStatementId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }
        
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Delete(string id, string cardStatementId)
        {
            await Mediator.Send(new DeleteTransactionCommand { Id = id, CardStatementId = cardStatementId });

            return NoContent();
        }
    }
}