using AutoMapper;
using Crease.WebUI.Data;
using Crease.WebUI.Models.ValueObjects;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using AutoMapper.QueryableExtensions;
using Crease.WebUI.Models;
using Microsoft.EntityFrameworkCore;
using IConfigurationProvider = AutoMapper.IConfigurationProvider;

namespace Crease.WebUI.Features.BankCards;

public class GetBankCards : ControllerBase
{
    private readonly IMediator _mediator;

    public GetBankCards(IMediator mediator) => _mediator = mediator;

    [Route("/bankcards")]
    [HttpGet]
    [SwaggerResponse(200, typeof(Result))]
    public async Task<ActionResult<Result>> Get()
    {
        return Ok(await _mediator.Send(new Query()));
    }

    public record Query : IRequest<Result>;

    public record Result
    {
        public List<BankCardDto> BankCards { get; init; }
        
        public record BankCardDto
        {
            public string Id { get; set; }
        
            public string Name { get; set; }
        
            public Bank Bank { get; set;}
        
            public StatementType StatementType { get; set; }
        
            public TransactionDateType TransactionDateType { get; set; }
        }
    }

    public class MappingProfile : Profile
    {
        public MappingProfile() => CreateProjection<BankCard, Result.BankCardDto>();
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
            var bankCards = await _db.BankCards
                .OrderBy(c => c.Name)
                .ProjectTo<Result.BankCardDto>(_configuration)
                .ToListAsync(cancellationToken: token);

            return new Result
            {
                BankCards = bankCards
            };
        }
    }
}