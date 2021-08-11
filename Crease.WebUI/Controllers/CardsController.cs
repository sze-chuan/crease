using System.Threading.Tasks;
using Crease.Application.Cards.Queries.GetCards;
using Microsoft.AspNetCore.Mvc;

namespace Crease.WebUI.Controllers
{
    public class CardsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<CardsVm>> Get()
        {
            return await Mediator.Send(new GetCardsQuery());
        }
    }
}