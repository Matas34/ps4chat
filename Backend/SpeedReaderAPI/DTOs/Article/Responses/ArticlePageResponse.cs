namespace SpeedReaderAPI.DTOs.Article.Responses;

public record ArticlePageResponse(long Count, ICollection<ArticleResponse> Articles);
