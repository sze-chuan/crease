using Crease.Domain.Entities;
using Crease.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crease.Infrastructure.Persistence.Configurations
{
    public class BankCardConfiguration : IEntityTypeConfiguration<BankCard>
    {
        public void Configure(EntityTypeBuilder<BankCard> builder)
        {
            builder.ToContainer("bankCard");
            builder.HasKey(card => card.Id);

            builder.Property(card => card.Id)
                .ToJsonProperty("id")
                .HasConversion<string>();

            builder.Property(card => card.Name)
                .ToJsonProperty("name")
                .IsRequired();

            builder.Property(card => card.Bank)
                .ToJsonProperty("bank")
                .HasConversion(
                    b => b.Name,
                    b => Bank.From(b));

            builder.Property(card => card.StatementType)
                .ToJsonProperty("statementType")
                .HasConversion(
                    st => st.Value,
                    st => StatementType.From(st));

            builder.Property(card => card.TransactionDateType)
                .ToJsonProperty("transactionDateType")
                .HasConversion(
                    td => td.Value,
                    td => TransactionDateType.From(td));
        }
    }
}