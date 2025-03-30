using System;
using Moq;
using Xunit;
using SpeedReaderAPI.Services;
using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.Services.Impl;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI;
using SpeedReaderAPI.Exceptions;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Unit;

public class CategoryServiceTests
{
    private readonly ContextCreator _contextCreator;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;
    private readonly CategoryService _categoryService;
    private readonly User _user;

    public CategoryServiceTests()
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

        DBHelperMethods.SeedUserData(context);
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
        
        
        _categoryService = new CategoryService(context, _mapper, _imageService, authService);
    }

    [Fact (DisplayName  = "Category creating")]
    public void CreateCategory ()
    {
        // Arrange
        var request = new CategoryCreateRequest("Test Title", "Test Text");
        
        // Act
        var result = _categoryService.CreateCategory(request);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Title", result.Title);
        Assert.Equal("Test Text", result.Text);
    }

    [Fact (DisplayName  = "Category getting")]
    public void GettingCategory ()
    {
        // Arrange
        var request = new CategoryCreateRequest("Test Article", "Test Category"); 
        var created = _categoryService.CreateCategory(request);
        
        // Act
        var result = _categoryService.GetCategoryById(created.Id);
        // Assert
        Assert.NotNull(result);
        Assert.Equal(created.Id, result.Id);
    }

    [Fact (DisplayName  = "Category updating")]
    public void UpdateCategory ()
    {
        // Arrange
        var request = new CategoryCreateRequest("Test Title", "Test Text"); 
        var created = _categoryService.CreateCategory(request);
        var updateRequest = new CategoryUpdateRequest("Test Title2", "Test Text2");
        
        // Act
        var result = _categoryService.UpdateCategory(created.Id, updateRequest);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Title2", result.Title);
        Assert.Equal("Test Text2", result.Text);
    }

    [Fact(DisplayName = "Category deleting")]
    public void DeleteCategory()
    {
        // Arrange
        var request = new CategoryCreateRequest("Test Title", "Test Text"); 
        var created = _categoryService.CreateCategory(request);
        
        // Act
        _categoryService.DeleteCategory(created.Id);

        // Assert
        var exception = Assert.Throws<ResourceNotFoundException>(() => 
            _categoryService.GetCategoryById(created.Id));
        Assert.Equal($"Category with ID {created.Id} not found.", exception.Message);
    }

    [Fact(DisplayName = "Category searching")]
    public void SearchCategory()
    {
        // Arrange
        var request = new CategoryCreateRequest("Test Title", "Test Text"); 
        var created = _categoryService.CreateCategory(request);
        
        var sideRequest = new CategoryCreateRequest("Test title", "Test text"); 
        var sideCreated = _categoryService.CreateCategory(request);

        // Act
        var queryParam = new QueryParameters();
        queryParam.Search = "Test Title";
        var result = _categoryService.SearchCategories(queryParam);
        // Assert
        Assert.NotNull(result);
        Assert.NotEmpty(result.Items);
        Assert.Equal("Test Title", result.Items[0].Title);
    }

    [Fact(DisplayName = "Category searching empty")]
    public void SearchCategoriesEmpty()
    {
        // Act
        var queryParam = new QueryParameters();
        queryParam.Search = "Test Cart";
        var result = _categoryService.SearchCategories(queryParam);
        // Assert
        Assert.NotNull(result);
        Assert.Empty(result.Items);
    }

    [Fact(DisplayName = "Category searching, multiple results")]
    public void SearchCategoriesMulti()
    {
        // Arrange
        var request = new CategoryCreateRequest("Test999 Category", "A"); 
        var created = _categoryService.CreateCategory(request);
        
        var sideRequest = new CategoryCreateRequest("Test999 Category", "B"); 
        var sideCreated = _categoryService.CreateCategory(sideRequest);

        // Act
        var queryParam = new QueryParameters
        {
            Search = "Test999"
        };
        var result = _categoryService.SearchCategories(queryParam);
        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Items.Count);
    }

    
    [Fact(DisplayName = "Category count")]
    public void CategoryCount(){
        long count = _categoryService.GetCount();
        Assert.Equal(0, count);
    }
    
}
