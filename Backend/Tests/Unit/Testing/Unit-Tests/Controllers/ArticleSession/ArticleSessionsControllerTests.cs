using Moq;
using Microsoft.Extensions.Logging;
using SpeedReaderAPI.Controllers;
using SpeedReaderAPI.Services;
using SpeedReaderAPI.DTOs.ArticleSession.Requests;
using SpeedReaderAPI.DTOs.ParagraphSession.Requests;
using SpeedReaderAPI.DTOs.ArticleSession.Responses;
using SpeedReaderAPI.DTOs.ParagraphSession;
using Microsoft.AspNetCore.Mvc;

namespace UnitTests;
public class ArticleSessionsControllerTests
{
    private readonly Mock<IArticleSessionService> _mockArticleSessionService;
    private readonly Mock<ILogger<ArticleSessionsController>> _mockLogger;
    private readonly ArticleSessionsController _controller;

    public ArticleSessionsControllerTests()
    {
        // Mocking the IArticleSessionService and ILogger
        _mockArticleSessionService = new Mock<IArticleSessionService>();
        _mockLogger = new Mock<ILogger<ArticleSessionsController>>();

        // Creating an instance of the controller with mocked dependencies
        _controller = new ArticleSessionsController(_mockLogger.Object, _mockArticleSessionService.Object);
    }

    [Fact]
    public async Task Create_ValidRequest_ReturnsOkResult()
    {
        // Arrange
         var request = new ArticleSessionCreateRequest(
            ArticleId: 1, 
            ParagraphSessions:
            [
                new ParagraphSessionCreateRequest(  ParagraphId: 1,
                    Duration: 20,
                    Wpm: 200,
                    CorrectQuestionCount: 1)
            ]
        );

        var expectedResponse = new ArticleSessionResponse(
            Id: 1,
            ArticleId: 1,
            Wpm: 200,
            CorrectQuestionCount: 5,
            TotalQuestionCount: 7,  
            Time: new DateTime(),
            Paragraphs:
            [
                new ParagraphSessionDto( ParagraphId: 1,
                    Wpm: 200,
                    CorrectQuestionCount: 5,
                    TotalQuestionCount: 7
                  )
            ]);
        // Mock the service call
        _mockArticleSessionService.Setup(service => service.CreateArticleSession(It.IsAny<ArticleSessionCreateRequest>()))
            .ReturnsAsync(expectedResponse);

        // Act
        var result = await _controller.Create(request);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result); 
        var returnValue = Assert.IsType<ArticleSessionResponse>(okResult.Value);
        Assert.Equal(expectedResponse.ArticleId, returnValue.ArticleId);
        Assert.Single(returnValue.Paragraphs);
        Assert.Equal(expectedResponse.Paragraphs.First().Wpm, returnValue.Paragraphs.First().Wpm);
    }
}