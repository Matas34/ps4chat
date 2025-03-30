
using SpeedReaderAPI.Entities;

public interface IDbArticleSessionRepository : IDefaultRepository<ArticleSession>
{
    public long CountByUserAndArticle(long? userId, int? articleId);
    public List<ArticleSession> GetPagedByUserAndArticle(int skip, int take, long? userId, int? articleId);
}