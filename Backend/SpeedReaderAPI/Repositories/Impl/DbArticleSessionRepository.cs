using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;

public class DbArticleSessionRepository : IDbArticleSessionRepository
{
    private readonly ApplicationContext _context;

    public DbArticleSessionRepository(ApplicationContext context)
    {
        _context = context;
    }

    public void Add(ArticleSession entity) => _context.ArticleSession.Add(entity);

    public long Count() => _context.ArticleSession.Count();

    public ArticleSession? FindById(int? id) => _context.ArticleSession.FirstOrDefault(a => a.Id == id);

    public List<ArticleSession> GetPaged(int skip, int take) => _context.ArticleSession.Skip(skip).Take(take).ToList();

    public long CountByUserAndArticle(long? userId, int? articleId) =>
        _context.ArticleSession.Count(e =>
            (!userId.HasValue || e.UserId == userId)
            && (!articleId.HasValue || e.ArticleId == articleId));


    public List<ArticleSession> GetPagedByUserAndArticle(int skip, int take, long? userId, int? articleId) => _context.ArticleSession
        .Where(e => (userId == null || e.UserId == userId)
                    && (articleId == null || e.ArticleId == articleId))
        .Skip(skip)
        .Take(take)
        .ToList();

    public void Remove(ArticleSession entity) => _context.ArticleSession.Remove(entity);
}
