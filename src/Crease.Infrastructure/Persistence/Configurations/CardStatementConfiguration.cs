using Crease.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crease.Infrastructure.Persistence.Configurations
{
    public class CardStatementConfiguration : IEntityTypeConfiguration<CardStatement>
    {
        public void Configure(EntityTypeBuilder<CardStatement> builder)
        {
            builder.Property(cardStatement => cardStatement.CardId)
                .IsRequired();

            builder.Property(cardStatement => cardStatement.MonthYear)
                .IsRequired();
        }
    }
}