using System.Collections.Generic;
using System.Threading.Tasks;
using Crease.Application.BankCards.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Crease.WebUI.Controllers
{
    public class BankCardsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<BankCardDto>> Get()
        {
            return await Mediator.Send(new GetBankCardsQuery());
        }
    }
}