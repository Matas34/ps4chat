namespace SpeedReaderAPI.DTOs.Paragraph.Responses;

public class ParagraphResponse
{
    public string Title { get; set; }
    public int ArticleId { get; set; }
    public int Id { get; set; }
    public string Text { get; set; }
    public List<int>? QuestionIds { get; set; }
    public string? ImageFileName { get; set; }
    public string? Author { get; set; }
}

