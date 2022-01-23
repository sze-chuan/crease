using Crease.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Crease.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Card> Cards { get; }
        
        DbSet<CardStatement> CardStatements { get; }
        
        DbSet<BankCard> BankCards { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
