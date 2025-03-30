namespace SpeedReaderAPI.Services;
using SpeedReaderAPI.DTOs.ParagraphSession;
using SpeedReaderAPI.DTOs.ParagraphSession.Requests;
using SpeedReaderAPI.Entities;

public interface IParagraphSessionService
{
    Task<ParagraphSessionDto[]> CreateParagraphSessions(Article article, ArticleSession articleSession, ParagraphSessionCreateRequest[] requests);
    List<ParagraphSessionDto> GetAllByArticleSession(ArticleSession articleSession);
}
