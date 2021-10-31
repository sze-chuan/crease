using System.Collections.Generic;
using System.Linq;
using Crease.Domain.Common;
using Crease.Domain.Exceptions;

namespace Crease.Domain.ValueObjects
{
    public class TransactionCategory : ValueObject
    {
        public string Value { get; }

        private TransactionCategory()
        {
        }

        private TransactionCategory(string value)
        {
            Value = value;
        }
        
        public static TransactionCategory From(string value)
        {
            var transactionCategory = new TransactionCategory(value);

            if (!SupportedTransactionCategories.Contains(transactionCategory))
            {
                throw new InvalidValueObjectException(nameof(TransactionCategory), value);
            }

            return transactionCategory;
        }

        public static TransactionCategory Dining => new(nameof(Dining));

        public static TransactionCategory FoodDelivery => new(nameof(FoodDelivery));

        public static TransactionCategory Shopping => new(nameof(Shopping));

        public static TransactionCategory Groceries => new(nameof(Groceries));

        public static TransactionCategory Transport => new(nameof(Transport));

        public static TransactionCategory Telco => new(nameof(Telco));

        public static TransactionCategory OnlineTvStreaming => new(nameof(OnlineTvStreaming));


        public override string ToString()
        {
            return Value;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Value;
        }
        
        private static IEnumerable<TransactionCategory> SupportedTransactionCategories
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