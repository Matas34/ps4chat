public class CategoryResponse
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Text { get; set; }
    public List<int>? ArticleIds { get; set; }
    public string? ImageFileName { get; set; }
    public string? Author { get; set; }
}
