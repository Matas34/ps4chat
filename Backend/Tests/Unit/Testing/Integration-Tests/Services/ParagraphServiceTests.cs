using AutoMapper;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.Services.Impl;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.Exceptions;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.DTOs.Question.Requests;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Unit;

public class ParagraphServiceTests
{
    private readonly ContextCreator _contextCreator;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;
    private readonly ArticleService _articleService;
    private readonly ParagraphService _paragraphService;
    private readonly QuestionService _questionService;
    private readonly ArticleResponse createdArticle;
    private readonly User _user;

    public ParagraphServiceTests()
    {
        // Create the context creator
        var context = ContextCreator.CreateIsolatedContext();

        // Set up AutoMapper with the actual mappings
        var mapperConfig = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<MappingProfiles>(); // Replace with your actual AutoMapper profile(s)
        });
        _mapper = mapperConfig.CreateMapper();

        // Create the ImageService
        _imageService = new ImageService();
        // _mockMapper.Object

        var inMemorySettings = new Dictionary<string, string>
        {
            { "Jwt:Key", "testkey" },
            { "Jwt:Issuer", "testissuer" },
            { "Jwt:Audience", "testaudience" }
        };

        Microsoft.Extensions.Configuration.IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(inMemorySettings)
            .Build();

        TokenService tokenService = new TokenService(configuration);

        DBHelperMethods.SeedInitialData(context);
        _user = DBHelperMethods.getUser(context);

        var httpContext = new DefaultHttpContext();
        httpContext.User = new ClaimsPrincipal(new ClaimsIdentity(
        [
            new Claim(ClaimTypes.NameIdentifier, _user.Id.ToString()),
            new Claim(ClaimTypes.Email, _user.Email),
            new Claim(ClaimTypes.Role, _user.Role.ToString()),
        ]));
        var contextAccessor = new HttpContextAccessor { HttpContext = httpContext };
        AuthService authService = new AuthService(context, _mapper, tokenService, contextAccessor);

        _questionService = new QuestionService(context, _mapper, _imageService, authService);
        _paragraphService = new ParagraphService(context, _mapper, _imageService, _questionService, authService);

        // Initialize ArticleService with mocks and context
        _articleService = new ArticleService(context, _mapper,
                                             _imageService,
                                             _paragraphService, authService);

        // Initialize ArticleService with mock data
        var request = new ArticleCreateRequest("Test Article", "Test Category", null, null, null, null, null);
        createdArticle = _articleService.CreateArticle(request);
    }

    [Fact(DisplayName = "Paragraph creating")]
    public void CreateParagraph()
    {
        var requestP = new ParagraphCreateRequest("Test Paragraph", createdArticle.Id, "Test Article");

        // Act
        var result = _paragraphService.CreateParagraph(requestP);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Paragraph", result.Title);
        Assert.Equal(createdArticle.Id, result.ArticleId);
    }
    [Fact(DisplayName = "Paragraph creating with Category")]
    public void CreateParagraphWithCategory()
    {

        // Arrange
        var catReq = new ArticleCreateRequest("Test Title", "Test Text", null, null, null, null, null);
        var catRes = _articleService.CreateArticle(catReq);
        var list = new List<int>();
        list.Add(catRes.Id);
        var request = new ParagraphCreateRequest("Test New Para", catRes.Id, "Test New Text");
        var result = _paragraphService.CreateParagraph(request);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test New Para", result.Title);
        Assert.Equal("Test New Text", result.Text);
    }

    [Fact(DisplayName = "Paragraph updating")]
    public void UpdateParagraph_withIDs()
    {
        var requestP = new ParagraphCreateRequest("Test Paragraph", createdArticle.Id, "Test Article");
        var createdP = _paragraphService.CreateParagraph(requestP);
        var parQue = new QuestionCreateRequest(createdP.Id, "Test Text", ["ABCasd", "DEFasd", "GHIasd", "IJKasd"], 0);
        var que = _questionService.CreateQuestion(parQue);
        var l = new List<int>();
        l.Add(que.Id);
        var requestP2 = new ParagraphUpdateRequest("Test Paragraph 2", createdArticle.Id, "Test Article", l);

        // Act
        var result = _paragraphService.UpdateParagraph(createdP.Id, requestP2);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Paragraph 2", result.Title);
        Assert.Equal(createdArticle.Id, result.ArticleId);
    }
    [Fact(DisplayName = "Paragraph getting")]
    public void GettingParagraph()
    {
        var requestP = new ParagraphCreateRequest("Test Paragraph", createdArticle.Id, "Test Article");
        var createdP = _paragraphService.CreateParagraph(requestP);

        // Act
        var result = _paragraphService.GetParagraph(createdP.Id);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Paragraph", result.Title);
        Assert.Equal(createdArticle.Id, result.ArticleId);
    }

    [Fact(DisplayName = "Paragraph updating")]
    public void UpdateParagraph()
    {
        var requestP = new ParagraphCreateRequest("Test Paragraph", createdArticle.Id, "Test Article");
        var createdP = _paragraphService.CreateParagraph(requestP);

        var requestP2 = new ParagraphUpdateRequest("Test Paragraph 2", createdArticle.Id, "Test Article", null);

        // Act
        var result = _paragraphService.UpdateParagraph(createdP.Id, requestP2);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Paragraph 2", result.Title);
        Assert.Equal(createdArticle.Id, result.ArticleId);
    }
    [Fact]
    public void UpdateParagrap_Invalid()
    {
        var requestP = new ParagraphCreateRequest("Test Paragraph", createdArticle.Id, "Test Article");
        var createdP = _paragraphService.CreateParagraph(requestP);

        var requestP2 = new ParagraphUpdateRequest("Test Paragraph 2", createdArticle.Id, "Test Article", null);

        // Act

        Assert.Throws<SpeedReaderAPI.Exceptions.ResourceNotFoundException>(() =>
            _paragraphService.UpdateParagraph(99999, requestP2)
        );
    }

    [Fact(DisplayName = "Paragraph deleting")]
    public void DeleteParagraph()
    {
        var requestP = new ParagraphCreateRequest("Test Paragraph", createdArticle.Id, "Test Article");
        var createdP = _paragraphService.CreateParagraph(requestP);

        // Act
        _paragraphService.DeleteParagraph(createdP.Id);

        // Assert
        var exception = Assert.Throws<ResourceNotFoundException>(() =>
            _paragraphService.GetParagraph(createdP.Id));
    }

    [Fact(DisplayName = "Paragraph creating with article id 0")]
    public void CreateParagraphWithArticleId0()
    {
        var requestP = new ParagraphCreateRequest("Test Paragraph", 0, "Test Article");

        // Act
        var exception = Assert.Throws<ResourceNotFoundException>(() =>
            _paragraphService.CreateParagraph(requestP));
    }

    [Fact(DisplayName = "Paragraph searching")]
    public void SearchParagraph()
    {
        var requestP = new ParagraphCreateRequest("Test ParagraphFromSearch", createdArticle.Id, "Test Article");
        var createdP = _paragraphService.CreateParagraph(requestP);

        var requestP2 = new ParagraphCreateRequest("Test Paragreph 2", createdArticle.Id, "Test Article");
        var createdP2 = _paragraphService.CreateParagraph(requestP2);

        // Act
        var queryParam = new QueryParameters();
        queryParam.Search = "Test ParagraphFromSearch";
        var result = _paragraphService.SearchParagraphs(queryParam);
        // Assert
        Assert.NotNull(result);
        Assert.NotEmpty(result.Items);
        Assert.Equal("Test ParagraphFromSearch", result.Items[0].Title);
        Assert.Equal(createdArticle.Id, result.Items[0].ArticleId);
    }

    [Fact(DisplayName = "Paragraph searching empty")]
    public void SearchParagraphEmpty()
    {
        // Act
        var queryParam = new QueryParameters();
        queryParam.Search = "Test Paragrapheeeee";
        var result = _paragraphService.SearchParagraphs(queryParam);
        // Assert
        Assert.NotNull(result);
        Assert.Empty(result.Items);
    }

    [Fact(DisplayName = "Paragraph searching, multiple results")]
    public void SearchParagraphMulti()
    {
        var requestP = new ParagraphCreateRequest("Test999 Paragraph", createdArticle.Id, "Test Article");
        var createdP = _paragraphService.CreateParagraph(requestP);

        var requestP2 = new ParagraphCreateRequest("Test999 Paragreph 2", createdArticle.Id, "Test Article");
        var createdP2 = _paragraphService.CreateParagraph(requestP2);

        // Act
        var queryParam = new QueryParameters();
        queryParam.Search = "Test999";
        var result = _paragraphService.SearchParagraphs(queryParam);
        // Assert
        Assert.NotNull(result);
        Assert.NotEmpty(result.Items);
        Assert.Equal(2, result.Items.Count);

    }
    [Fact(DisplayName = "Category count")]
    public void CategoryCount()
    {
        long count = _paragraphService.GetCount();
        Assert.Equal(3, count);
    }
}
