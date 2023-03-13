using AutoMapper;
using AutoMapper.QueryableExtensions;
using Crease.WebUI.Data;
using Crease.WebUI.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web.Resource;
using NSwag.Annotations;
using IConfigurationProvider = AutoMapper.IConfigurationProvider;

namespace Crease.WebUI.Features.Cards;

public class GetCards : ApiControllerBase
{
    [Route("/cards")]
    [RequiredScope(Constants.Scopes.CardRead)]
    [HttpGet]
    [SwaggerResponse(200, typeof(GetCardsResponse))]
    public async Task<ActionResult<GetCardsResponse>> List()
    {
        return Ok(await Mediator.Send(new Query()));
    }

    public record Query : IRequest<GetCardsResponse>;

    public record GetCardsResponse
    {
        public List<CardDto> Cards { get; init; }
        
        public record CardDto
        {
            public string Id { get; set; }
        
            public string Name { get; set; }
        
            public string BankCardId { get; set;}
        }
    }

    public class MappingProfile : Profile
    {
        public MappingProfile() => CreateProjection<Card, GetCardsResponse.CardDto>();
    }
    
    public class Handler : IRequestHandler<Query, GetCardsResponse>
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfigurationProvider _configuration;

        public Handler(ApplicationDbContext db, IConfigurationProvider configuration)
        {
            _db = db;
            _configuration = configuration;
        }

        public async Task<GetCardsResponse> Handle(Query message, CancellationToken token)
        {
            var cards = await _db.Cards
                .OrderBy(c => c.Name)
                .ProjectTo<GetCardsResponse.CardDto>(_configuration)
                .ToListAsync(cancellationToken: token);

            return new GetCardsResponse
            {
                Cards = cards
            };
        }
    }
}