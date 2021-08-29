using System.Threading.Tasks;
using Crease.Application.Transactions.Commands.CreateTransactionCommand;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Crease.WebUI.Controllers
{
    public class TransactionsController : ApiControllerBase
    {
        [HttpPost]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<string>> Create([FromBody] CreateTransactionCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
    }
}