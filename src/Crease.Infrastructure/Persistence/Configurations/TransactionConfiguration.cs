using Crease.Domain.Entities;
using Crease.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crease.Infrastructure.Persistence.Configurations
{
    public class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.HasKey(transaction => transaction.Id);
            
            builder.Property(transaction => transaction.Id)
                .ToJsonProperty("id")
                .HasConversion<string>();

            builder.Property(transaction => transaction.CardStatementId)
                .ToJsonProperty("cardStatementId")
                .IsRequired();

            builder.Property(transaction => transaction.Date)
                .ToJsonProperty("date")
                .IsRequired();

            builder.Property(transaction => transaction.Amount)
                .ToJsonProperty("amount")
                .IsRequired();
                
            builder.Property(transaction => transaction.Description)
                .ToJsonProperty("description")
                .HasMaxLength(200)
                .IsRequired();
            
            builder.Property(transaction => transaction.TransactionCategory)
                .ToJsonProperty("transactionCategory")
                .HasConversion(
                    tc => tc.Value,
                    tc => TransactionCategory.From(tc));
            
            builder.Property(transaction => transaction.PaymentType)
                .ToJsonProperty("paymentType")
                .HasConversion(
                    pt => pt.Value,
                    pt => PaymentType.From(pt));

            builder.HasOne<CardStatement>()
                .WithMany(cardStatement => cardStatement.Transactions)
                .HasForeignKey(transaction => transaction.CardStatementId);
        }
    }
}