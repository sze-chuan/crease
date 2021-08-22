using System.Collections.Generic;
using Crease.Domain.Common;

namespace Crease.Domain.ValueObjects
{
    public class PaymentCategory : ValueObject
    {
        public string Value { get; }

        public PaymentCategory(string value)
        {
            Value = value;
        }

        public static PaymentCategory Dining => new("Dining");

        public static PaymentCategory Shopping => new("Shopping");

        public static PaymentCategory Groceries => new("Groceries");

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Value;
        }
    }
}