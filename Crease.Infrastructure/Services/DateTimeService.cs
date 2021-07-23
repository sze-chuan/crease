using System;
using Crease.Application.Common.Interfaces;

namespace Crease.Main.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
