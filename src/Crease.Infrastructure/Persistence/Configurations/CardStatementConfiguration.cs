using Crease.Domain.Entities;
using Crease.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crease.Infrastructure.Persistence.Configurations
{
    public class CardStatementConfiguration : IEntityTypeConfiguration<CardStatement>
    {
        public void Configure(EntityTypeBuilder<CardStatement> builder)
        {
            builder.HasKey(cardStatement => cardStatement.Id);
            builder.HasPartitionKey(cardStatement => cardStatement.UserId);
            
            builder.Property(cardStatement => cardStatement.Id)
                .ToJsonProperty("id")
                .HasConversion<string>();

            builder.Property(cardStatement => cardStatement.CardId)
                .ToJsonProperty("cardId")
                .IsRequired();
            
            builder.Property(cardStatement => cardStatement.BankCardId)
                .ToJsonProperty("bankCardId")
                .IsRequired();

            builder.Property(cardStatement => cardStatement.MonthYear)
                .ToJsonProperty("monthYear")
                .IsRequired();

            builder.Property(cardStatement => cardStatement.UserId)
                .ToJsonProperty("userId")
                .IsRequired();

            builder.OwnsOne(cardStatement => cardStatement.StatementReward, srBuilder =>
            {
                srBuilder.ToJsonProperty("statementReward");
                srBuilder.Property(reward => reward.Miles).ToJsonProperty("miles");
                srBuilder.Property(reward => reward.Cashback).ToJsonProperty("cashback");
                srBuilder.Property(reward => reward.Points).ToJsonProperty("points");
            });

            builder.OwnsMany(cardStatement => cardStatement.Transactions, action =>
            {
                action.ToJsonProperty("transactions");
                action.HasKey(transaction => transaction.Id);
                
                action.Property(transaction => transaction.Id)
                    .ValueGeneratedNever()
                    .ToJsonProperty("id");

                action.Property(transaction => transaction.CardStatementId)
                    .ToJsonProperty("cardStatementId");
                
                action.Property(transaction => transaction.Date)
                    .ToJsonProperty("date")
                    .IsRequired();

                action.Property(transaction => transaction.Amount)
                    .ToJsonProperty("amount")
                    .IsRequired();
                
                action.Property(transaction => transaction.Description)
                    .ToJsonProperty("description")
                    .HasMaxLength(200)
                    .IsRequired();
            
                action.Property(transaction => transaction.TransactionCategory)
                    .ToJsonProperty("transactionCategory")
                    .HasConversion(
                        tc => tc.Value,
                        tc => TransactionCategory.From(tc));
            
                action.Property(transaction => transaction.PaymentType)
                    .ToJsonProperty("paymentType")
                    .HasConversion(
                        pt => pt.Value,
                        pt => PaymentType.From(pt));
            });
        }
    }
}