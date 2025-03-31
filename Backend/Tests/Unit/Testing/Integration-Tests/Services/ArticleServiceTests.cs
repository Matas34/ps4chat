using AutoMapper;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.Services.Impl;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI;
using SpeedReaderAPI.Exceptions;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;

namespace Unit;

public class ArticleServiceTests
{
    private readonly ContextCreator _contextCreator;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;
    private readonly ArticleService _articleService;
    private readonly ParagraphService _paragraphService;
    private readonly QuestionService _questionService;
    private readonly CategoryService _categoryService;
    private readonly User _user;

    public ArticleServiceTests()
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
        _categoryService = new CategoryService(context, _mapper, _imageService, authService);
    }

    [Fact(DisplayName = "Article creating")]
    public void CreateArticle()
    {
        // Arrange
        var request = new ArticleCreateRequest("Test Article", "Test Category", "abcd", "abcd", "abce", null, null);

        // Act
        var result = _articleService.CreateArticle(request);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Article", result.Title);
        Assert.Equal("Test Category", result.CategoryTitle);
    }


    [Fact(DisplayName = "Article getting")]
    public void GettingArticle()
    {
        // Arrange
        var request = new ArticleCreateRequest("Test Article", "Test Category", "abcd", "abcd", "abce", null, null);

        var created = _articleService.CreateArticle(request);

        // Act
        var result = _articleService.GetArticleById(created.Id);
        // Assert
        Assert.NotNull(result);
        Assert.Equal(created.Id, result.Id);
    }
    [Fact(DisplayName = "Article getting")]
    public void AddNonExistingCategory()
    {
        // // Arrange
        // var request = new ArticleCreateRequest("Test Article", "Test Category", null); 
        // var created = _articleService.CreateArticle(request);
        // // Act
        // var result = _articleService.(created.Id);
        // // Assert
        // Assert.NotNull(result);
        // Assert.Equal(created.Id, result.Id);
    }
    [Fact(DisplayName = "Article creating with Category")]
    public void CreateArticleWithCategory()
    {

        // Arrange
        var catReq = new CategoryCreateRequest("Test Title", "Test Text");
        var catRes = _categoryService.CreateCategory(catReq);
        var list = new List<int>();
        list.Add(catRes.Id);
        var request = new ArticleCreateRequest("Test Article", "Test Category", "abcd", "abcd", "abce", null, null);
        var result = _articleService.CreateArticle(request);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Article", result.Title);
        Assert.Equal("Test Category", result.CategoryTitle);
    }

    [Fact(DisplayName = "Article updating")]
    public void UpdateArticle()
    {
        var catReq = new CategoryCreateRequest("Test Title", "Test Text");
        var catRes = _categoryService.CreateCategory(catReq);
        var list = new List<int>();
        list.Add(catRes.Id);
        var catReq3 = new CategoryCreateRequest("Test Title", "Test Text");
        var catRes3 = _categoryService.CreateCategory(catReq3);
        var list3 = new List<int>();
        list3.Add(catRes.Id);
        // Arrange
        var request = new ArticleCreateRequest("Test Article", "Test Category", "abcd", "abcd", "abce", null, null);

        var created = _articleService.CreateArticle(request);

        var catReq2 = new ParagraphCreateRequest("Test Title", created.Id, "Test Text");
        var catRes2 = _paragraphService.CreateParagraph(catReq2);
        var list2 = new List<int>();
        list2.Add(catRes2.Id);
        var updateRequest = new ArticleUpdateRequest("Updated Article", "Updated Category", "abcd", "abcd", "abce", null, list2, list3);
        // Act
        var result = _articleService.UpdateArticle(created.Id, updateRequest);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Updated Article", result.Title);
        Assert.Equal("Updated Category", result.CategoryTitle);
    }

    [Fact(DisplayName = "Article deleting")]
    public void DeleteArticle()
    {
        // Arrange
        var request = new ArticleCreateRequest("Test Article", "Test Category", "abcd", "abcd", "abce", null, null);

        var created = _articleService.CreateArticle(request);

        // Act
        _articleService.DeleteArticle(created.Id);

        // Assert
        var exception = Assert.Throws<ResourceNotFoundException>(() =>
            _articleService.GetArticleById(created.Id));
        Assert.Equal($"Article with ID {created.Id} not found.", exception.Message);
    }

    [Fact(DisplayName = "Article searching")]
    public void SearchArticle()
    {
        // Arrange
        var request = new ArticleCreateRequest("Test Article", "Test Category", "abcd", "abcd", "abce", null, null);

        var created = _articleService.CreateArticle(request);

        var sideRequest = new ArticleCreateRequest("Test Article", "Test Category", "abcd", "abcd", "abce", null, null);

        var sideCreated = _articleService.CreateArticle(request);

        // Act
        var queryParam = new QueryParameters();
        queryParam.Search = "Test Article";
        var result = _articleService.SearchArticles(queryParam);
        // Assert
        Assert.NotNull(result);
        Assert.NotEmpty(result.Items);
        Assert.Equal("Test Article", result.Items[0].Title);
    }

    [Fact(DisplayName = "Article searching empty")]
    public void SearchArticlesEmpty()
    {
        // Act
        var queryParam = new QueryParameters();
        queryParam.Search = "Test Articleeeee";
        var result = _articleService.SearchArticles(queryParam);
        // Assert
        Assert.NotNull(result);
        Assert.Empty(result.Items);
    }

    [Fact(DisplayName = "Article searching, multiple results")]
    public void SearchArticleMulti()
    {
        // Arrange
        var request = new ArticleCreateRequest("Test Article", "Test Category", "abcd", "abcd", "abce", null, null);
        var created = _articleService.CreateArticle(request);

        var sideRequest = new ArticleCreateRequest("Test999 Articlse", "Test Category", "abcd", "abcd", "abce", null, null);
        var sideCreated = _articleService.CreateArticle(sideRequest);

        // Act
        var queryParam = new QueryParameters
        {
            Search = "Test999"
        };
        var result = _articleService.SearchArticles(queryParam);
        // Assert
        Assert.NotNull(result);
        Assert.Equal(1, result.Items.Count);
    }

    //     [Fact(DisplayName = "Article searching, multiple results depr")]
    //     public void SearchArticleMultiDepr()
    //     {
    //         // Arrange
    //         var request = new ArticleCreateRequest("Test999 Article", "Test Category", "abcd", "abcd", "abcd", "abce", null); 
    //         var created = _articleService.CreateArticle(request);

    //         var sideRequest = new ArticleCreateRequest("Test999 Article", "Test Category", "abcd", "abcd", "abcd", "abce", null); 
    //         var sideCreated = _articleService.CreateArticle(sideRequest);

    //         // Act
    //         var queryParam = new QueryParameters
    //         {
    //             Search = "Test999"
    //         };
    //         var result = _articleService.GetArticles(queryParam);
    //         // Assert
    //         Assert.NotNull(result);
    //         Assert.Equal(2, result.Count);
    //     }
    //     [Fact(DisplayName = "Category count")]
    //     public void CategoryCount(){
    //         long count = _articleService.GetCount();
    //         Assert.Equal(0, count);
    //     }
    // [Fact(DisplayName = "Already has image")]
    // public void Image_Invalid_HasAlready(){
    //      var request = new ArticleCreateRequest("Test999 Article", "Test Category", null); 
    //     var created = _articleService.CreateArticle(request);
    //     _articleService.UploadImage(created.Id, null);
    // }
    //     [Fact (DisplayName = "count")]
    //     public void Count(){
    //         Assert.Equal(0, _articleService.GetCount());
    //     }

    //     [Fact(DisplayName = "Article searching, multiple results depr")]
    //     public void SearchArticleMultiDepr()
    //     {
    //         // Arrange
    //         var request = new ArticleCreateRequest("Test999 Article", "Test Category", null); 
    //         var created = _articleService.CreateArticle(request);

    //         var sideRequest = new ArticleCreateRequest("Test999 Articly", "Test Category", null); 
    //         var sideCreated = _articleService.CreateArticle(sideRequest);

    //         // Act
    //         var queryParam = new QueryParameters
    //         {
    //             Search = "Test999"
    //         };
    //         var result = _articleService.GetArticles(queryParam);
    //         // Assert
    //         Assert.NotNull(result);
    //         Assert.Equal(2, result.Count);
    //     }
    //     [Fact(DisplayName = "Category count")]
    //     public void CategoryCount(){
    //         long count = _articleService.GetCount();
    //         Assert.Equal(0, count);
    //     }
    // [Fact(DisplayName = "Already has image")]
    // public void Image_Invalid_HasAlready(){
    //      var request = new ArticleCreateRequest("Test999 Article", "Test Category", null); 
    //     var created = _articleService.CreateArticle(request);
    //     _articleService.UploadImage(created.Id, null);
    // }
    [Fact(DisplayName = "count")]
    public void Count()
    {
        Assert.Equal(2, _articleService.GetCount());
    }
}
