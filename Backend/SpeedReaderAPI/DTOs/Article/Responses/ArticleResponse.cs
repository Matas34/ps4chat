namespace SpeedReaderAPI.DTOs.Article.Responses;

public class ArticleResponse
{
    public string Title { get; set; }
    public int Id { get; set; }
    public string? CategoryTitle { get; set; }
    public string? Publisher { get; set; }
    public string? Url { get; set; }
    public string? Language { get; set; }
    public List<int>? ParagraphIds { get; set; }
    public List<int>? CategoryIds { get; set; }
    public string? ImageFileName { get; set; }
    public string? Author { get; set; }
    public string? OriginalAuthor { get; set; }
}
