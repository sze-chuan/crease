using Crease.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crease.Infrastructure.Persistence.Configurations
{
    public class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.Property(transaction => transaction.CardStatementId)
                .IsRequired();

            builder.Property(transaction => transaction.Date)
                .IsRequired();

            builder.Property(transaction => transaction.Amount)
                .IsRequired();

            builder.OwnsOne(b => b.PaymentCategory);
            builder.OwnsOne(b => b.PaymentType);
        }
    }
}