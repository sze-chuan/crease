using System.Collections.Generic;
using System.Threading.Tasks;
using Crease.Application.Cards.Commands.CreateCard;
using Crease.Application.Cards.Queries.GetCard;
using Crease.Application.Cards.Queries.GetCards;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Crease.WebUI.Controllers
{
    public class CardsController : ApiControllerBase
    {
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<CardDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CardDto>>> Get()
        {
            return Ok(await Mediator.Send(new GetCardsQuery()));
        }

        [HttpGet("{cardId}")]
        [ProducesResponseType(typeof(CardDto), StatusCodes.Status200OK)]
        public async Task<ActionResult<CardDto>> Get(string cardId)
        {
            return Ok(await Mediator.Send(new GetCardQuery(cardId)));
        }

        [HttpPost]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<int>> Create(CreateCardCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
    }
}