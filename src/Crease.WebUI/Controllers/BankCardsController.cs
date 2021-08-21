using System.Collections.Generic;
using System.Threading.Tasks;
using Crease.Application.BankCards.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Crease.WebUI.Controllers
{
    public class BankCardsController : ApiControllerBase
    {
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<BankCardDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<BankCardDto>>> Get()
        {
            return Ok(await Mediator.Send(new GetBankCardsQuery()));
        }
    }
}