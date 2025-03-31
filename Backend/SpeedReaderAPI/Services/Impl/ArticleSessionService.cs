namespace SpeedReaderAPI.Services.Impl;

using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.ArticleSession.Requests;
using SpeedReaderAPI.DTOs.ArticleSession.Responses;
using SpeedReaderAPI.DTOs.ParagraphSession;
using SpeedReaderAPI.DTOs.ParagraphSession.Requests;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Exceptions;

public class ArticleSessionService : IArticleSessionService
{
    private readonly CombinedRepositories _context;
    private readonly IAuthService _userService;
    private readonly IParagraphSessionService _paragraphSessionService;
    private readonly IMapper _mapper;
    private const double SECONDS_PER_MIN = 60D;

    // Production constructor
    public ArticleSessionService(ApplicationContext context, IAuthService userService, IParagraphSessionService paragraphSessionService, IMapper mapper)
    {
        _context = new CombinedRepositories(context);
        _mapper = mapper;
        _userService = userService;
        _paragraphSessionService = paragraphSessionService;
    }

    public async Task<ArticleSessionResponse> CreateArticleSession(ArticleSessionCreateRequest request)
    {
        // Transactional
        return await _context.ExecuteTransactionAsync(async () =>
        {
            User? user = _userService.GetAuthenticatedUser();
            if (user == null)
                throw new UnauthorizedAccessException("User is not authenticated.");

            Article? articleFound = _context.Article.FindById(request.ArticleId);
            if (articleFound == null)
                throw new ResourceNotFoundException($"Article with ID {request.ArticleId} not found.");

            ArticleSession session = new ArticleSession
            {
                UserId = user.Id,
                ArticleId = articleFound.Id,
                Time = DateTime.UtcNow,
            };

            _context.ArticleSession.Add(session);
            await _context.SaveChangesAsync();

            ParagraphSessionDto[] paragraphSessionDtos = await _paragraphSessionService.CreateParagraphSessions(articleFound, session, request.ParagraphSessions!);

            // Calculate article session stats
            int sessionQuestionCount = CalculateQuestionCount(request.ParagraphSessions!);
            int sessionCorrectQuestionCount = CalculateCorrectQuestionCount(request.ParagraphSessions!);
            var paragraphSessions = request.ParagraphSessions!;
            double totalWords = (double)paragraphSessions.Sum(s => s.Wpm! * s.Duration! / SECONDS_PER_MIN)!;
            int totalDurationInSeconds = paragraphSessions.Sum(s => s.Duration ?? 0);
            int sessionWpm = (int)Math.Round(totalWords / (totalDurationInSeconds / SECONDS_PER_MIN));

            // Set article session stats
            session.CorrectQuestionCount = sessionCorrectQuestionCount;
            session.TotalQuestionCount = sessionQuestionCount;
            session.Wpm = sessionWpm;

            // Update user stats
            user.WordsRead += (long)Math.Round(totalWords);
            user.SecondsRead += totalDurationInSeconds;
            user.CorrectQuestions += sessionCorrectQuestionCount;
            user.TotalQuestions += sessionQuestionCount;
            user.ArticlesCountRead++;

            await _context.SaveChangesAsync();
            return CreateArticleSessionResponse(session, paragraphSessionDtos);
        });
    }

    public PageResponse<ArticleSessionResponse> GetAllByAuthenticatedUser(QueryParameters queryParameters)
    {
        User? user = _userService.GetAuthenticatedUser();
        if (user == null)
            throw new UnauthorizedAccessException("User is not authenticated.");

        long sessionCount = _context.ArticleSession.CountByUserAndArticle(user.Id, null);
        List<ArticleSession> sessions = _context.ArticleSession.GetPagedByUserAndArticle((queryParameters.PageNumber - 1) * queryParameters.PageSize, queryParameters.PageSize, user.Id, null)
            .Where(s => (queryParameters.startAt == null || s.Time >= queryParameters.startAt) && (queryParameters.endAt == null || s.Time <= queryParameters.endAt))
            .ToList();
        List<ArticleSessionResponse> sessionResponses = sessions.Select(s =>
        {
            var paragraphSessionDtos = _paragraphSessionService.GetAllByArticleSession(s).ToArray();
            return CreateArticleSessionResponse(s, paragraphSessionDtos);
        }).ToList();
        return new PageResponse<ArticleSessionResponse>(sessionCount, sessionResponses);
    }

    private int CalculateCorrectQuestionCount(ParagraphSessionCreateRequest[] paragraphSessions)
    {
        return paragraphSessions.Sum(s => s.CorrectQuestionCount ?? 0);
    }

    private int CalculateQuestionCount(ParagraphSessionCreateRequest[] paragraphSessions)
    {
        return paragraphSessions.Sum(s => _context.Paragraph.FindById(s.ParagraphId)!.QuestionIds.Count);
    }

    private ArticleSessionResponse CreateArticleSessionResponse(ArticleSession session, ParagraphSessionDto[] paragraphSessions)
    {
        return new ArticleSessionResponse(session.Id,
                session.ArticleId,
                session.Wpm,
                session.CorrectQuestionCount,
                session.TotalQuestionCount,
                session.Time,
                paragraphSessions
            );
    }
}
