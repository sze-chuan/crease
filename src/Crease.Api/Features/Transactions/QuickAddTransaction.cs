using Crease.Domain.Extensions;
using Crease.WebUI.Data;
using Crease.WebUI.Exceptions;
using Crease.WebUI.Models;
using Crease.WebUI.Models.ValueObjects;
using Crease.WebUI.Services;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web.Resource;
using NSwag.Annotations;

namespace Crease.WebUI.Features.Transactions;

public class QuickAddTransaction : ApiControllerBase
{
    [Route("/transactions")]
    [RequiredScope(Constants.Scopes.TransactionWrite)]
    [HttpPost]
    [SwaggerResponse(204, null)]
    [SwaggerResponse(400, null)]
    public async Task<ActionResult> Create([FromBody] QuickAddTransactionRequest message)
    {
        await Mediator.Send(message);
        return NoContent();
    }
    
    public class Validator : AbstractValidator<QuickAddTransactionRequest>
    {
        public Validator()
        {
            RuleFor(m => m.CardId).NotEmpty();
            RuleFor(m => m.PaymentType).NotEmpty();
            RuleFor(m => m.TransactionCategory).NotEmpty();
            RuleFor(m => m.Description).NotEmpty();
            RuleFor(m => m.Date).NotEmpty();
            RuleFor(m => m.Amount).NotEmpty().GreaterThanOrEqualTo(0);
        }
    }
    
    public record QuickAddTransactionRequest : IRequest
    {
        public Guid CardId { get; set; }
        public string PaymentType { get; set; }
        public string TransactionCategory { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
    }
    
    public class Handler : IRequestHandler<QuickAddTransactionRequest>
    {
        private readonly ApplicationDbContext _db;
        private readonly ICurrentUserService _userService;
        private readonly ILogger _logger;

        public Handler(ApplicationDbContext db, ICurrentUserService userService, ILogger<Handler> logger)
        {
            _db = db;
            _userService = userService;
            _logger = logger;
        }

        public async Task<Unit> Handle(QuickAddTransactionRequest message, CancellationToken token)
        {
            var card = await _db.Cards.FindAsync(new object[] { message.CardId }, token);

            if (card == null)
            {
                throw new HttpResponseException(400, "Invalid card");
            }

            var bankCard =
                await _db.BankCards.FindAsync(new object[] { card.BankCardId }, token);

            var statementMonthYear = bankCard.GetStatementMonthYearOnTransactionDate(message.Date.ToUtcTimeFormat());
            var statement = await _db.CardStatements
                .Where(statement => statement.CardId == message.CardId
                                    && statement.MonthYear == statementMonthYear
                                    && statement.UserId == _userService.UserId)
                .SingleOrDefaultAsync(token);

            if (statement == null)
            {
                _logger.LogInformation($"Creating new card statement for card ({message.CardId}) and month ({statementMonthYear:MM yyyy})");
                statement = new CardStatement
                {
                    BankCardId = bankCard.Id,
                    CardId = message.CardId,
                    MonthYear = statementMonthYear,
                    UserId = _userService.UserId
                };

                await _db.CardStatements.AddAsync(statement, token);
            }

            var transaction = new Transaction
            {
                Id = Guid.NewGuid(),
                PaymentType = PaymentType.From(message.PaymentType),
                Amount = message.Amount,
                TransactionCategory = TransactionCategory.From(message.TransactionCategory),
                Description = message.Description,
                Date = message.Date.ToUtcTimeFormat()
            };
            
            statement.Transactions.Add(transaction);
            statement.UpdateStatementReward(bankCard.GetEffectiveRewardVersion(statement.MonthYear));
            
            await _db.SaveChangesAsync(token);
            return Unit.Value;
        }
    }
}