namespace Crease.Domain.Extensions;

public static class Extensions
{
    public static bool IsNullOrEmpty<T>(this IEnumerable<T> enumerable)
    {
        return enumerable switch
        {
            null => true,
            ICollection<T> collection => collection.Count < 1,
            _ => !enumerable.Any()
        };
    }
        
    public static bool IsNullOrEmpty<T>(this ICollection<T> collection)
    {
        if (collection == null)
        {
            return true;
        }
        return collection.Count < 1;
    }

    public static DateTime ToUtcTimeFormat(this DateTime date)
    {
        return DateTime.SpecifyKind(date, DateTimeKind.Utc);
    }
}