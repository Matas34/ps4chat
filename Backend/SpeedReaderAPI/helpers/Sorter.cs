namespace SpeedReaderAPI.helpers;

public static class Sorter
{
    public static List<T> SortList<T>(List<T> articles, bool asc = true) 
        where T : IComparable<T>
    {
        List<T> sorted;

        if (asc)
        {
            sorted = (from a in articles
                      orderby a
                      select a).ToList(); 
        }
        else
        {
            sorted = (from a in articles
                      orderby a descending
                      select a).ToList(); 
        }
        return sorted;
    }
}