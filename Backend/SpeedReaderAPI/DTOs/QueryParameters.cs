namespace SpeedReaderAPI.DTOs;

public class QueryParameters
{
    const int maxPageSize = 50;
    public int PageNumber { get; set; } = 1;
    private int pageSize = 10;
    public int PageSize
    {
        get { return pageSize; }
        set { pageSize = (value > maxPageSize) ? maxPageSize : value; }
    }

    //Sorting params
    public string OrderBy { get; set; } = string.Empty;
    public bool OrderAsc { get; set; } = true;
    public string Search { get; set; } = string.Empty;
    public long? UserId { get; set; }

    public DateTime? startAt { get; set; }
    public DateTime? endAt { get; set; }
}