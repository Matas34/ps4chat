namespace SpeedReaderAPI.Services;

using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.ArticleSession.Requests;
using SpeedReaderAPI.DTOs.ArticleSession.Responses;

public interface IArticleSessionService
{
    Task<ArticleSessionResponse> CreateArticleSession(ArticleSessionCreateRequest request);
    PageResponse<ArticleSessionResponse> GetAllByAuthenticatedUser(QueryParameters queryParameters);
}
