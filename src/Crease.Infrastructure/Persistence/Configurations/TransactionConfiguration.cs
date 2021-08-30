using Crease.Domain.Entities;
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

            builder.OwnsOne(b => b.TransactionCategory, tc =>
            {
                tc.ToJsonProperty("transactionCategory");
                tc.Property(p => p.Value).ToJsonProperty("value");
            });

            builder.OwnsOne(b => b.PaymentType, pt =>
            {
                pt.ToJsonProperty("paymentType");
                pt.Property(p => p.Value).ToJsonProperty("value");
            });

            builder.HasOne<CardStatement>()
                .WithMany(cardStatement => cardStatement.Transactions)
                .HasForeignKey(transaction => transaction.CardStatementId);
        }
    }
}