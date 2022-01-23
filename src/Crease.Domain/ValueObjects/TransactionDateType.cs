using Crease.Domain.Common;

namespace Crease.Domain.ValueObjects
{
    public class TransactionDateType : ValueObject
    {
        public string Value { get; }

        private TransactionDateType(string value)
        {
            Value = value;
        }
        
        public static TransactionDateType From(string value)
        {
            var transactionDateType = new TransactionDateType(value);

            return transactionDateType;
        }

        public static TransactionDateType Transaction => new(nameof(Transaction));

        public static TransactionDateType Posted => new(nameof(Posted));
        
        public override string ToString()
        {
            return Value;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Value;
        }
    }
}