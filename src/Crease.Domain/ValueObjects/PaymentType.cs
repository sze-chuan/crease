using System.Collections.Generic;
using Crease.Domain.Common;

namespace Crease.Domain.ValueObjects
{
    public class PaymentType : ValueObject
    {
        public string Value { get; }

        private PaymentType(string value)
        {
            Value = value;
        }

        private PaymentType()
        {
        }

        public static PaymentType Online => new("Online");

        public static PaymentType Contactless => new("Contactless");

        public static PaymentType Physical => new("Physical");

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Value;
        }
    }
}