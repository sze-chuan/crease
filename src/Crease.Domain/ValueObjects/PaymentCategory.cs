using System.Collections.Generic;
using System.Linq;
using Crease.Domain.Common;
using Crease.Domain.Exceptions;

namespace Crease.Domain.ValueObjects
{
    public class PaymentCategory : ValueObject
    {
        private string Value { get; }

        private PaymentCategory(string value)
        {
            Value = value;
        }

        private PaymentCategory()
        {
        }
        
        public static PaymentCategory From(string value)
        {
            var paymentCategory = new PaymentCategory(value);

            if (!SupportedPaymentCategories.Contains(paymentCategory))
            {
                throw new InvalidValueObjectException(nameof(PaymentCategory), value);
            }

            return paymentCategory;
        }

        public static PaymentCategory Dining => new(nameof(Dining));

        public static PaymentCategory Shopping => new(nameof(Shopping));

        public static PaymentCategory Groceries => new(nameof(Groceries));

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Value;
        }
        
        private static IEnumerable<PaymentCategory> SupportedPaymentCategories
        {
            get
            {
                yield return Dining;
                yield return Shopping;
                yield return Groceries;
            }
        }
    }
}