using System.Collections.Generic;
using Crease.Domain.Common;

namespace Crease.Domain.ValueObjects
{
    public class Bank : ValueObject
    {
        public string Name { get; }

        public Bank(string name)
        {
            Name = name;
        }

        public static Bank Dbs => new("DBS");

        public static Bank Ocbc => new("OCBC");

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Name;
        }
    }
}