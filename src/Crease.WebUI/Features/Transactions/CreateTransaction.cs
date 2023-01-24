using Crease.WebUI.Data;
using Crease.WebUI.Exceptions;
using Crease.WebUI.Models;
using Crease.WebUI.Models.ValueObjects;
using Crease.WebUI.Services;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NSwag.Annotations;

namespace Crease.WebUI.Features.Transactions;

public class CreateTransaction : ControllerBase
{
    private readonly IMediator _mediator;

    public CreateTransaction(IMediator mediator) => _mediator = mediator;

    [Route("card-statements/{cardStatementId}/transactions")]
    [Authorize]
    [HttpPost]
    [SwaggerResponse(201, typeof(Guid))]
    [SwaggerResponse(400, null)]
    public async Task<ActionResult<Guid>> Create(Guid cardStatementId, [FromBody] CreateTransactionRequest message)
    {
        return Created((string)null, await _mediator.Send(new Command
        {
            CardStatementId = cardStatementId,
            PaymentType = message.PaymentType,
            TransactionCategory = message.TransactionCategory,
            Description = message.Description,
            Date = message.Date,
            Amount = message.Amount
        }));
    }

    public class Validator : AbstractValidator<CreateTransactionRequest>
    {
        public Validator()
        {
            RuleFor(m => m.PaymentType).NotNull();
            RuleFor(m => m.TransactionCategory).NotNull();
            RuleFor(m => m.Description).NotNull();
            RuleFor(m => m.Date).NotNull();
            RuleFor(m => m.Amount).NotNull().GreaterThanOrEqualTo(0);
        }
    }

    public record CreateTransactionRequest
    {
        public string PaymentType { get; set; }
        public string TransactionCategory { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
    }

    public record Command : CreateTransactionRequest, IRequest<Guid>
    {
        public Guid CardStatementId { get; set; }
    }

    public class Handler : IRequestHandler<Command, Guid>
    {
        private readonly ApplicationDbContext _db;
        private readonly ICurrentUserService _userService;

        public Handler(ApplicationDbContext db, ICurrentUserService userService)
        {
            _db = db;
            _userService = userService;
        }

        public async Task<Guid> Handle(Command message, CancellationToken token)
        {
            var statement = await _db.CardStatements
                .Where(statement => statement.Id == message.CardStatementId && statement.UserId == _userService.UserId)
                .SingleOrDefaultAsync(token);

            if (statement == null)
            {
                throw new HttpResponseException(400, "Card statement not found.");
            }
            
            var bankCard =
                await _db.BankCards.FindAsync(new object[] { statement.BankCardId }, token);

            var transaction = new Transaction
            {
                Id = Guid.NewGuid(),
                PaymentType = PaymentType.From(message.PaymentType),
                Amount = message.Amount,
                TransactionCategory = TransactionCategory.From(message.TransactionCategory),
                Description = message.Description,
                Date = message.Date
            };
            
            statement.Transactions.Add(transaction);
            statement.UpdateStatementReward(bankCard.GetEffectiveRewardVersion(statement.MonthYear));

            await _db.SaveChangesAsync(token);

            return transaction.Id;
        }
    }
}