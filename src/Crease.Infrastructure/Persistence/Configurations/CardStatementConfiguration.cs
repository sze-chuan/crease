using Crease.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crease.Infrastructure.Persistence.Configurations
{
    public class CardStatementConfiguration : IEntityTypeConfiguration<CardStatement>
    {
        public void Configure(EntityTypeBuilder<CardStatement> builder)
        {
            builder.ToContainer("cardStatement")
                .HasNoDiscriminator()
                .HasKey(cardStatement => cardStatement.Id);
            
            builder.Property(cardStatement => cardStatement.Id)
                .ToJsonProperty("id")
                .HasConversion<string>();

            builder.Property(cardStatement => cardStatement.CardId)
                .ToJsonProperty("cardId")
                .IsRequired();

            builder.Property(cardStatement => cardStatement.MonthYear)
                .ToJsonProperty("monthYear")
                .IsRequired();
        }
    }
}