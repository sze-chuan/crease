﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using Crease.WebUI.Data;
using Crease.WebUI.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NSwag.Annotations;
using IConfigurationProvider = AutoMapper.IConfigurationProvider;

namespace Crease.WebUI.Features.Cards;

public class GetCards : ApiControllerBase
{
    [Route("/cards")]
    [Authorize]
    [HttpGet]
    [SwaggerResponse(200, typeof(Result))]
    public async Task<ActionResult<Result>> List()
    {
        return Ok(await Mediator.Send(new Query()));
    }

    public record Query : IRequest<Result>;

    public record Result
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
        public MappingProfile() => CreateProjection<Card, Result.CardDto>();
    }
    
    public class Handler : IRequestHandler<Query, Result>
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfigurationProvider _configuration;

        public Handler(ApplicationDbContext db, IConfigurationProvider configuration)
        {
            _db = db;
            _configuration = configuration;
        }

        public async Task<Result> Handle(Query message, CancellationToken token)
        {
            var cards = await _db.Cards
                .OrderBy(c => c.Name)
                .ProjectTo<Result.CardDto>(_configuration)
                .ToListAsync(cancellationToken: token);

            return new Result
            {
                Cards = cards
            };
        }
    }
}