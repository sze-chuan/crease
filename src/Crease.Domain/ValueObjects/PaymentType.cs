using System.Collections.Generic;
using System.Linq;
using Crease.Domain.Common;
using Crease.Domain.Exceptions;

namespace Crease.Domain.ValueObjects
{
    public class PaymentType : ValueObject
    {
        public string Value { get; }

        private PaymentType()
        {
        }

        private PaymentType(string value)
        {
            Value = value;
        }

        public static PaymentType From(string value)
        {
            var paymentType = new PaymentType(value);

            if (!SupportedPaymentTypes.Contains(paymentType))
            {
                throw new InvalidValueObjectException(nameof(PaymentType), value);
            }

            return paymentType;
        }

        public static PaymentType Online => new(nameof(Online));

        public static PaymentType Contactless => new(nameof(Contactless));

        public static PaymentType Physical => new(nameof(Physical));

        public override string ToString()
        {
            return Value;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Value;
        }

        private static IEnumerable<PaymentType> SupportedPaymentTypes
        {
            get
            {
                yield return Online;
                yield return Contactless;
                yield return Physical;
            }
        }
    }
}