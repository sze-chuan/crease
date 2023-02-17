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

public class UpdateTransaction : ApiControllerBase
{
    [Route("transactions/{id}")]
    [Authorize]
    [HttpPut]
    [SwaggerResponse(204, null)]
    [SwaggerResponse(400, null)]
    [SwaggerResponse(404, null)]
    public async Task<ActionResult<Guid>> Create(Guid transactionId, [FromBody] UpdateTransactionRequest message)
    {
        await Mediator.Send(new Command
        {
            Id = transactionId,
            PaymentType = message.PaymentType,
            TransactionCategory = message.TransactionCategory,
            Description = message.Description,
            Date = message.Date,
            Amount = message.Amount
        });
        
        return NoContent();
    }

    public class Validator : AbstractValidator<UpdateTransactionRequest>
    {
        public Validator()
        {
            RuleFor(m => m.CardStatementId).NotEmpty();
            RuleFor(m => m.PaymentType).NotEmpty();
            RuleFor(m => m.TransactionCategory).NotEmpty();
            RuleFor(m => m.Description).NotEmpty();
            RuleFor(m => m.Date).NotEmpty();
            RuleFor(m => m.Amount).NotEmpty().GreaterThanOrEqualTo(0);
        }
    }

    public record UpdateTransactionRequest
    {
        public Guid CardStatementId { get; set; }
        public string PaymentType { get; set; }
        public string TransactionCategory { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
    }

    public record Command : UpdateTransactionRequest, IRequest
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly ApplicationDbContext _db;
        private readonly ICurrentUserService _userService;

        public Handler(ApplicationDbContext db, ICurrentUserService userService)
        {
            _db = db;
            _userService = userService;
        }

        public async Task<Unit> Handle(Command message, CancellationToken token)
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
                Id = message.Id,
                PaymentType = PaymentType.From(message.PaymentType),
                Amount = message.Amount,
                TransactionCategory = TransactionCategory.From(message.TransactionCategory),
                Description = message.Description,
                Date = message.Date
            };

            if (!statement.UpdateTransaction(transaction))
            {
                throw new HttpResponseException(404, "Transaction not found.");
            }
            
            statement.UpdateStatementReward(bankCard.GetEffectiveRewardVersion(statement.MonthYear));
            await _db.SaveChangesAsync(token);

            return Unit.Value;
        }
    }
}