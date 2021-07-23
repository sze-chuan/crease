﻿using System.Threading;
using System.Threading.Tasks;

namespace Crease.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
