using AutoMapper.QueryableExtensions;
using Crease.WebUI.Data;
using Crease.WebUI.Exceptions;
using Crease.WebUI.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NSwag.Annotations;
using IConfigurationProvider = AutoMapper.IConfigurationProvider;

namespace Crease.WebUI.Features.CardStatements;

public class GetCardStatement : ControllerBase
{
    private readonly IMediator _mediator;

    public GetCardStatement(IMediator mediator) => _mediator = mediator;

    [Route("/card-statements/{id}")]
    [Authorize]
    [HttpGet]
    [SwaggerResponse(200, typeof(CardStatementDto))]
    [SwaggerResponse(400, null)]
    [SwaggerResponse(404, null)]
    public async Task<ActionResult<CardStatementDto>> Get(Guid id)
    {
        return Ok(await _mediator.Send(new Query(id)));
    }

    public record Query(Guid Id) : IRequest<CardStatementDto>;

    public class Handler : IRequestHandler<Query, CardStatementDto>
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

        public async Task<CardStatementDto> Handle(Query message, CancellationToken token)
        {
            var statement = await _db.CardStatements
                .Where(statement => statement.Id == message.Id && statement.UserId == _userService.UserId)
                .ProjectTo<CardStatementDto>(_configuration)
                .AsNoTracking()
                .SingleOrDefaultAsync(token);

            if (statement == null)
            {
                throw new HttpResponseException(StatusCodes.Status404NotFound);
            }

            return statement;
        }
    }
}