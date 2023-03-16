using AutoMapper.QueryableExtensions;
using Crease.Domain.Extensions;
using Crease.WebUI.Data;
using Crease.WebUI.Services;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web.Resource;
using NSwag.Annotations;
using IConfigurationProvider = AutoMapper.IConfigurationProvider;

namespace Crease.WebUI.Features.CardStatements;

public class GetCardStatementByMonthYear : ApiControllerBase
{
    [Route("/card-statements")]
    [RequiredScope(Constants.Scopes.CardStatementRead)]
    [HttpGet]
    [SwaggerResponse(200, typeof(CardStatementDto))]
    [SwaggerResponse(400, null)]
    [SwaggerResponse(404, null)]
    public async Task<ActionResult<CardStatementDto>> Get([FromQuery] Query message)
    {
        return Ok(await Mediator.Send(message));
    }
    
    public class Validator : AbstractValidator<Query>
    {
        public Validator()
        {
            RuleFor(m => m.CardId).NotEmpty();
            RuleFor(m => m.MonthYear).NotEmpty();
        }
    }

    public record Query : IRequest<CardStatementDto>
    {
        public Guid CardId { get; set; }

        public DateTime MonthYear { get; set; }
    }

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
            var queryMonthYear = new DateTime(message.MonthYear.Year, message.MonthYear.Month, 1).ToUtcTimeFormat();

            var statement = await _db.CardStatements
                .Where(statement => statement.CardId == message.CardId
                                    && statement.MonthYear == queryMonthYear
                                    && statement.UserId == _userService.UserId)
                .ProjectTo<CardStatementDto>(_configuration)
                .AsNoTracking()
                .SingleOrDefaultAsync(token);
            
            return statement;
        }
    }
}