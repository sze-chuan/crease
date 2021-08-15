using System.Threading.Tasks;
using Crease.Application.BankCards.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Crease.WebUI.Controllers
{
    public class BankCardsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<BankCardsVm>> Get()
        {
            return await Mediator.Send(new GetBankCardsQuery());
        }
    }
}