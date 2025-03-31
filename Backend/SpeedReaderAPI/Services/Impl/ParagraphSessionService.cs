namespace SpeedReaderAPI.Services.Impl;

using System.Collections.Concurrent;
using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.ParagraphSession;
using SpeedReaderAPI.DTOs.ParagraphSession.Requests;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Exceptions;

public class ParagraphSessionService : IParagraphSessionService
{
    private readonly CombinedRepositories _context;
    private readonly IMapper _mapper;

    public ParagraphSessionService(ApplicationContext context, IMapper mapper)
    {
        _context = new CombinedRepositories(context);
        _mapper = mapper;
    }

    // TODO: fix
    private async Task<ParagraphSessionDto> CreateParagraphSession(Article article, ArticleSession articleSession, ParagraphSessionCreateRequest request)
    {
        Paragraph? paragraphFound = _context.Paragraph.FindById(request.ParagraphId);
        if (paragraphFound == null)
        {
            throw new ResourceNotFoundException($"Paragraph with ID {request.ParagraphId} not found.");
        }
        if (paragraphFound.ArticleId != article.Id)
        {
            throw new Exception("Illegal state: article mismatch");
        }

        ParagraphSession session = _mapper.Map<ParagraphSession>(request);
        session.ArticleSessionId = articleSession.Id;
        session.TotalQuestionCount = paragraphFound.QuestionIds.Count;

        _context.ParagraphSession.Add(session);

        return _mapper.Map<ParagraphSessionDto>(session);
    }

    public async Task<ParagraphSessionDto[]> CreateParagraphSessions(Article article,
        ArticleSession articleSession,
        ParagraphSessionCreateRequest[] requests)
    {
        var concurrentCollection = new ConcurrentBag<ParagraphSessionDto>();

        var tasks = requests.Select(async (paragraphRequest) =>
        {
            var paragraphSessionCreated = await CreateParagraphSession(article, articleSession, paragraphRequest);
            concurrentCollection.Add(paragraphSessionCreated);
        }).ToList();

        await Task.WhenAll(tasks);

        await _context.SaveChangesAsync();

        return concurrentCollection.ToArray();
    }

    public List<ParagraphSessionDto> GetAllByArticleSession(ArticleSession articleSession)
    {
        return _context.ParagraphSession.GetAllByArticleSession(articleSession.Id)
        .Select(_mapper.Map<ParagraphSessionDto>)
        .ToList();
    }
}
