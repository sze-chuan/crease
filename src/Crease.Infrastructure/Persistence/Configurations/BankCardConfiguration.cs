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
            
            builder.OwnsMany(card => card.RewardVersions, rewardVersion =>
            {
                rewardVersion.ToJsonProperty("rewardVersions");
                rewardVersion.Property(version => version.EffectiveStartDate).ToJsonProperty("effectiveStartDate");
                rewardVersion.Property(version => version.EffectiveEndDate).ToJsonProperty("effectiveEndDate");
                rewardVersion.Property(version => version.MinSpendAmount).ToJsonProperty("minSpendAmount");
                rewardVersion.OwnsMany(version => version.RewardComputations, rewardComputation =>
                {
                    rewardComputation.ToJsonProperty("rewardComputations");
                    rewardComputation.Property(computation => computation.RewardType)
                        .ToJsonProperty("rewardType")
                        .HasConversion(rt => rt.Value, rt => RewardType.From(rt));
                    rewardComputation.Property(computation => computation.Multiplier).ToJsonProperty("multiplier");
                    rewardComputation.Property(computation => computation.RewardsCap).ToJsonProperty("rewardsCap");
                    rewardComputation.OwnsMany(computation => computation.PaymentTypes, ptBuilder =>
                    {
                        ptBuilder.ToJsonProperty("paymentTypes");
                        ptBuilder.Property(type => type.Value).ToJsonProperty("value");
                    });
                    rewardComputation.OwnsMany(computation => computation.TransactionCategories, tcBuilder =>
                    {
                        tcBuilder.ToJsonProperty("transactionCategories");
                        tcBuilder.Property(category => category.Value).ToJsonProperty("value");
                    });
                });
            });
        }
    }
}