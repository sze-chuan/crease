using Crease.Domain.Common;

namespace Crease.Domain.ValueObjects;

public class StatementType : ValueObject
{
    public string Value { get; }

    private StatementType(string value)
    {
        Value = value;
    }
        
    public static StatementType From(string value)
    {
        var statementType = new StatementType(value);

        return statementType;
    }

    public static StatementType Calendar => new(nameof(Calendar));

    public static StatementType Statement => new(nameof(Statement));
        
    public override string ToString()
    {
        return Value;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }
}