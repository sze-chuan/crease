using Crease.Domain.Common;

namespace Crease.Domain.ValueObjects;

public class Bank : ValueObject
{
    public string Name { get; }

    public Bank(string name)
    {
        Name = name;
    }
        
    public static Bank From(string name)
    {
        var paymentType = new Bank(name);

        return paymentType;
    }

    public static Bank Dbs => new("DBS");

    public static Bank Ocbc => new("OCBC");

    public static Bank Maybank => new ("MAYBANK");

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Name;
    }
}