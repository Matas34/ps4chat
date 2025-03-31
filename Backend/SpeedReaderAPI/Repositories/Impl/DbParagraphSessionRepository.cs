using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;

public class DbParagraphSessionRepository : IDbParagraphSessionRepository
{
    private readonly ApplicationContext _context;

    public DbParagraphSessionRepository(ApplicationContext context)
    {
        _context = context;
    }

    public void Add(ParagraphSession entity) => _context.ParagraphSession.Add(entity);

    public long Count() => _context.ParagraphSession.Count();

    public ParagraphSession? FindById(int? id) => _context.ParagraphSession.FirstOrDefault(a => a.Id == id);

    public List<ParagraphSession> GetAllByArticleSession(long articleSessionId) => _context.ParagraphSession.Where(e => e.ArticleSessionId == articleSessionId).ToList();

    public List<ParagraphSession> GetPaged(int skip, int take) => _context.ParagraphSession.Skip(skip).Take(take).ToList();

    public void Remove(ParagraphSession entity) => _context.ParagraphSession.Remove(entity);
}

