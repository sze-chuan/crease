using Crease.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crease.Infrastructure.Persistence.Configurations
{
    public class CardConfiguration : IEntityTypeConfiguration<Card>
    {
        public void Configure(EntityTypeBuilder<Card> builder)
        {
            builder.ToContainer("card")
                .HasNoDiscriminator()
                .HasKey(card => card.Id);

            builder.Property(card => card.Id)
                .ToJsonProperty("id")
                .HasConversion<string>();
            
            builder.Property(card => card.Name)
                .ToJsonProperty("name")
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(card => card.CardNumber)
                .ToJsonProperty("cardNumber")
                .HasMaxLength(10)
                .IsRequired();

            builder.Property(card => card.StartDate)
                .ToJsonProperty("startDate")
                .IsRequired();

            builder.Property(card => card.BankCardId)
                .ToJsonProperty("bankCardId")
                .IsRequired();
        }
    }
}