using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Exceptions;
using SpeedReaderAPI.helpers;
namespace SpeedReaderAPI.Services.Impl;



public class ArticleService : IArticleService
{
    private readonly CombinedRepositories _context;
    private readonly IImageService _imageService;
    private readonly IParagraphService _paragraphService;
    private readonly IMapper _mapper;
    private readonly IAuthService _authService;

    // Production constructor
    public ArticleService(ApplicationContext context, IMapper mapper,
        IImageService imageService, IParagraphService paragraphService, IAuthService authService)
    {
        _context = new CombinedRepositories(context);
        _mapper = mapper;
        _imageService = imageService;
        _paragraphService = paragraphService;
        _authService = authService;
    }

    public ArticlePageResponse GetArticles(QueryParameters queryParameters)
    {
        long articleCount = _context.Article.Count();
        List<Article> articles = _context.Article.GetPaged((queryParameters.PageNumber - 1) * queryParameters.PageSize, queryParameters.PageSize);
        List<ArticleResponse> articleResponseList = _mapper.Map<List<ArticleResponse>>(articles);
        return new ArticlePageResponse(articleCount, articleResponseList);
    }

    public ArticleResponse GetArticleById(int id)
    {
        Article? articleFound = _context.Article.FindById(id);
        if (articleFound == null)
        {
            throw new ResourceNotFoundException($"Article with ID {id} not found.");
        }
        return _mapper.Map<ArticleResponse>(articleFound);
    }

    public ArticleResponse CreateArticle(ArticleCreateRequest request)
    {
        User? user = _authService.GetAuthenticatedUser();
        if (user == null) throw new UnauthorizedAccessException();

        Article createdArticle = _mapper.Map<Article>(request);
        createdArticle.UserId = user.Id;

        _context.Article.Add(createdArticle);
        _context.SaveChanges();
        if (request.CategoryIds != null)
        {
            var addedCategoryIdsList = request.CategoryIds.ToList();
            AttachCategoriesToArticle(createdArticle, addedCategoryIdsList);
        }
        _context.SaveChanges();
        return _mapper.Map<ArticleResponse>(createdArticle);
    }

    public ArticleResponse RandomArticle(){
        Article? articleFound = _context.Article.GetRandom();
        if (articleFound == null)
        {
            throw new ResourceNotFoundException("No articles found.");
        }
        return _mapper.Map<ArticleResponse>(articleFound);
    }


    public ArticleResponse UpdateArticle(int id, ArticleUpdateRequest request)
    {
        User? user = _authService.GetAuthenticatedUser();
        Article? articleFound = _context.Article.FindById(id);
        if (articleFound == null)
        {
            throw new ResourceNotFoundException($"Article with ID {id} not found.");
        }

        if (articleFound.UserId != user?.Id)
            throw new UnauthorizedAccessException();


        if (request.OriginalAuthor != null)
        {
            articleFound.OriginalAuthor = request.OriginalAuthor;
        }
        if (request.Title != null)
        {
            articleFound.Title = request.Title;
        }
        if (request.CategoryTitle != null)
        {
            articleFound.CategoryTitle = request.CategoryTitle;
        }
        if (request.ParagraphIds != null)
        {
            var difference = articleFound.ParagraphIds.Except(request.ParagraphIds);
            if (difference.Any() || articleFound.ParagraphIds.Count != request.ParagraphIds.Count)
            {
                throw new InvalidParagraphIdListException();
            }
            articleFound.ParagraphIds = request.ParagraphIds;
        }
        if (request.CategoryIds != null)
        {
            var removedCategoryIdsList = articleFound.CategoryIds.Except(request.CategoryIds).ToList();
            var addedCategoryIdsList = request.CategoryIds.Except(articleFound.CategoryIds).ToList();
            DetachCategoriesFromArticle(articleFound, removedCategoryIdsList);
            AttachCategoriesToArticle(articleFound, addedCategoryIdsList);
            articleFound.CategoryIds = request.CategoryIds;
        }
        if (request.Publisher != null)
        {
            articleFound.Publisher = request.Publisher;
        }
        if (request.Url != null)
        {
            articleFound.Url = request.Url;
        }
        if (request.Language != null)
        {
            articleFound.Language = request.Language;
        }
        _context.SaveChanges();
        return _mapper.Map<ArticleResponse>(articleFound);
    }

    private void AttachCategoriesToArticle(Article? articleFound, List<int> addedCategoryIdsList)
    {
        foreach (int addedCategoryId in addedCategoryIdsList)
        {
            Category? categoryFound = _context.Category.FindById(addedCategoryId);
            if (categoryFound == null)
            {
                throw new ResourceNotFoundException($"Category with ID {addedCategoryId} not found.");
            }
            categoryFound.ArticleIds.Add(articleFound.Id);
        }
    }

    private void DetachCategoriesFromArticle(Article? articleFound, List<int> removedCategoryIdsList)
    {
        foreach (int removedCategoryId in removedCategoryIdsList)
        {
            Category? categoryFound = _context.Category.FindById(removedCategoryId);
            if (categoryFound == null)
            {
                throw new ResourceNotFoundException($"Category with ID {removedCategoryId} not found.");
            }
            categoryFound.ArticleIds.Remove(articleFound.Id);
        }
    }

    public void DeleteArticle(int articleId)
    {
        User? user = _authService.GetAuthenticatedUser();

        Article? articleFound = _context.Article.FindById(articleId);
        if (articleFound == null)
        {
            throw new ResourceNotFoundException($"Article with ID {articleId} not found.");
        }

        if (articleFound.UserId != user?.Id)
            throw new UnauthorizedAccessException();

        if (articleFound.Image != null && articleFound.Image.HasValue)
        {
            _imageService.Delete((Image)articleFound.Image);
        }

        var copyOfParaphIds = articleFound.ParagraphIds.ToList();
        copyOfParaphIds.ForEach(_paragraphService.DeleteParagraph);
        var removedCategoryIdsList = articleFound.CategoryIds.ToList();
        DetachCategoriesFromArticle(articleFound, removedCategoryIdsList);
        _context.Article.Remove(articleFound);
        _context.SaveChanges();
    }

    public PageResponse<ArticleResponse> SearchArticles(QueryParameters queryParameters)
    {
        long articleCount = _context.Article.Count();
        List<Article> articles = _context.Article.GetPaged((queryParameters.PageNumber - 1) * queryParameters.PageSize, queryParameters.PageSize)
                                                    .Where(a => (string.IsNullOrEmpty(queryParameters.Search) || a.Title.Contains(queryParameters.Search))
                                                    && (queryParameters.UserId == null || a.UserId == queryParameters.UserId))
                                                    .ToList();
        var sortedArticles = Sorter.SortList(articles);
        List<ArticleResponse> articleResponseList = _mapper.Map<List<ArticleResponse>>(sortedArticles);
        return new PageResponse<ArticleResponse>(articleCount, articleResponseList);
    }

    public async Task<ArticleResponse> UploadImage(int id, ImageUploadRequest request)
    {
        User? user = _authService.GetAuthenticatedUser();
        Article? articleFound = _context.Article.FindById(id);
        if (articleFound == null)
        {
            throw new ResourceNotFoundException($"Article with ID {id} not found.");
        }

        if (articleFound.UserId != user?.Id)
            throw new UnauthorizedAccessException();

        if (articleFound.Image.HasValue)
        {
            throw new ResourceAlreadyExistsException($"Article with ID {id} has an image.");
        }
        articleFound.Image = await _imageService.Create(request);
        await _context.SaveChangesAsync();

        return _mapper.Map<ArticleResponse>(articleFound);
    }

    public Image GetImage(int id)
    {
        Article? articleFound = _context.Article.FindById(id);
        if (articleFound == null)
        {
            throw new ResourceNotFoundException($"Article with ID {id} not found.");
        }
        try
        {
            if (!articleFound.Image.HasValue) throw new Exception();
            Image img = articleFound.Image.Value;
            Stream? stream = _imageService.Get(img);
            if (stream == null) throw new Exception();
            img.FileStream = stream;
            return img;
        }
        catch (Exception)
        {
            throw new ResourceNotFoundException($"Article with ID {id} doesn't have an image.");
        }
    }

    public void DeleteImage(int id)
    {
        User? user = _authService.GetAuthenticatedUser();
        Article? articleFound = _context.Article.FindById(id);
        if (articleFound == null)
        {
            throw new ResourceNotFoundException($"Article with ID {id} not found.");
        }

        if (articleFound.UserId != user?.Id)
            throw new UnauthorizedAccessException();

        if (articleFound.Image == null || !articleFound.Image.HasValue) return;
        _imageService.Delete((Image)articleFound.Image);

        articleFound.Image = null;
        _context.SaveChanges();
    }

    public long GetCount()
    {
        return _context.Article.Count();
    }
}
