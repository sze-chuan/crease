using System.Threading;
using System.Threading.Tasks;
using Crease.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Crease.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Card> Cards { get; }
        
        DbSet<CardStatement> CardStatements { get; }
        
        DbSet<Transaction> Transactions { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
