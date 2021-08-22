using System.Threading.Tasks;
using Crease.Application.CardStatements.Queries.GetCardStatement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Crease.WebUI.Controllers
{
    public class CardStatementsController : ApiControllerBase
    {
        [HttpGet]
        [ProducesResponseType(typeof(CardStatementDto), StatusCodes.Status200OK)]
        public async Task<ActionResult<CardStatementDto>> Get([FromQuery] GetCardStatementQuery query)
        {
            return Ok(await Mediator.Send(query));
        }
    }
}