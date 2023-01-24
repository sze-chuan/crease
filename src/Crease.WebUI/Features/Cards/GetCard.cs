﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using Crease.WebUI.Data;
using Crease.WebUI.Exceptions;
using Crease.WebUI.Models;
using Crease.WebUI.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NSwag.Annotations;
using IConfigurationProvider = AutoMapper.IConfigurationProvider;

namespace Crease.WebUI.Features.Cards;

public class GetCard : ControllerBase
{
    private readonly IMediator _mediator;

    public GetCard(IMediator mediator) => _mediator = mediator;

    [Route("/cards/{id}")]
    [Authorize]
    [HttpGet]
    [SwaggerResponse(200, typeof(CardDto))]
    [SwaggerResponse(400, null)]
    [SwaggerResponse(404, null)]
    public async Task<ActionResult<CardDto>> Get(Guid id)
    {
        return Ok(await _mediator.Send(new Query(id)));
    }

    public record Query(Guid Id) : IRequest<CardDto>;

    public record CardDto
    {
        public string Id { get; set; }
        
        public string Name { get; set; }
        
        public string BankCardId { get; set;}
    }

    public class MappingProfile : Profile
    {
        public MappingProfile() => CreateProjection<Card, CardDto>();
    }
    
    public class Handler : IRequestHandler<Query, CardDto>
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfigurationProvider _configuration;
        private readonly ICurrentUserService _userService;

        public Handler(ApplicationDbContext db, IConfigurationProvider configuration, ICurrentUserService userService)
        {
            _db = db;
            _configuration = configuration;
            _userService = userService;
        }

        public async Task<CardDto> Handle(Query message, CancellationToken token)
        {
            var card = await _db.Cards
                .Where(card => card.Id == message.Id && card.UserId == _userService.UserId)
                .ProjectTo<CardDto>(_configuration)
                .SingleOrDefaultAsync(token);

            if (card == null)
            {
                throw new HttpResponseException(StatusCodes.Status404NotFound);
            }

            return card;
        }
    }
}