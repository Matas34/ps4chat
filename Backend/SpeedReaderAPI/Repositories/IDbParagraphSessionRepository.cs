using SpeedReaderAPI.Entities;

public interface IDbParagraphSessionRepository : IDefaultRepository<ParagraphSession>
{
    public List<ParagraphSession> GetAllByArticleSession(long articleSessionId);
}