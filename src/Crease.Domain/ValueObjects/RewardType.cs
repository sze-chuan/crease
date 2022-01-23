using Crease.Domain.Common;

namespace Crease.Domain.ValueObjects;

public class RewardType : ValueObject
{
    public string Value { get; }

    private RewardType(string value)
    {
        Value = value;
    }

    public static RewardType From(string value)
    {
        return new RewardType(value);
    }

    public static RewardType Cashback => new(nameof(Cashback));

    public static RewardType Points => new(nameof(Points));
        
    public static RewardType Miles => new(nameof(Miles));
        
    public override string ToString()
    {
        return Value;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }
}