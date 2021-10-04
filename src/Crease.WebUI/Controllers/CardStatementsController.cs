using System.Threading.Tasks;
using Crease.Application.CardStatements.Commands.CreateCardStatement;
using Crease.Application.CardStatements.Queries.Dto;
using Crease.Application.CardStatements.Queries.GetCardStatement;
using Crease.Application.CardStatements.Queries.GetCardStatementByMonthYear;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Crease.WebUI.Controllers
{
    [Authorize]
    public class CardStatementsController : ApiControllerBase
    {
        [HttpGet("period")]
        [ProducesResponseType(typeof(CardStatementDto), StatusCodes.Status200OK)]
        public async Task<ActionResult<CardStatementDto>> Get([FromQuery] GetCardStatementByMonthYearQuery byMonthYearQuery)
        {
            return Ok(await Mediator.Send(byMonthYearQuery));
        }
        
        [HttpGet("{cardStatementId}")]
        [ProducesResponseType(typeof(CardStatementDto), StatusCodes.Status200OK)]
        public async Task<ActionResult<CardStatementDto>> Get(string cardStatementId)
        {
            return Ok(await Mediator.Send(new GetCardStatementQuery(cardStatementId)));
        }
        
        [HttpPost]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<string>> Create(CreateCardStatementCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
    }
}