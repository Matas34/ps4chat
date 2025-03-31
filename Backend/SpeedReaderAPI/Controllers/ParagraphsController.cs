using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.DTOs.Paragraph.Responses;
namespace SpeedReaderAPI.Controllers;

using Microsoft.AspNetCore.Authorization;
using Serilog;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Services;

[ApiController]
[Route("api/[controller]")]
public class ParagraphsController : ControllerBase
{
    private readonly IParagraphService _paragraphService;
    private readonly ILogger<ParagraphsController> _logger;
    private readonly IDiagnosticContext _diagnosticContext;

    public ParagraphsController(ILogger<ParagraphsController> logger, IParagraphService paragraphService, IDiagnosticContext diagnosticContext)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _diagnosticContext = diagnosticContext ?? throw new ArgumentNullException(nameof(diagnosticContext));
        _paragraphService = paragraphService;

        _diagnosticContext.Set("Controller", nameof(ParagraphsController));
    }


    [HttpPost("{id}/img")]
    [Authorize(Roles = "USER,ADMIN")]
    public async Task<IActionResult> UploadImage(int id, [FromForm] ImageUploadRequest request)
    {
        ParagraphResponse result = await _paragraphService.UploadImage(id, request);
        return Ok(result);
    }

    [HttpDelete("{id}/img")]
    [Authorize(Roles = "USER,ADMIN")]
    public IActionResult DeleteImage(int id)
    {
        _paragraphService.DeleteImage(id);
        return Ok("Deleted");
    }

    [HttpGet("{id}/img")]
    public IActionResult GetImage(int id)
    {
        var img = _paragraphService.GetImage(id);
        return File(img.FileStream!, img.ImageMimeType.ToMimeString(), img.ImageFilePath);
    }

    [HttpPost]
    [Authorize(Roles = "USER,ADMIN")]
    public ActionResult<int> CreateParagraph(ParagraphCreateRequest request)
    {
        ParagraphResponse paragraphResponse = _paragraphService.CreateParagraph(request);
        return Ok(paragraphResponse);
    }

    [HttpGet("{id}")]
    public IActionResult GetParagraph(int id)
    {
        ParagraphResponse paragraphResponse = _paragraphService.GetParagraph(id);
        return Ok(paragraphResponse);
    }

    [HttpGet("search/")]
    public IActionResult SearchParagraphs([FromQuery] QueryParameters queryParameters)
    {
        PageResponse<ParagraphResponse> paragraphs = _paragraphService.SearchParagraphs(queryParameters);
        return Ok(paragraphs);
    }


    [HttpPut("{id}")]
    [Authorize(Roles = "USER,ADMIN")]
    public IActionResult UpdateParagraph(int id, ParagraphUpdateRequest request)
    {
        ParagraphResponse paragraphResponse = _paragraphService.UpdateParagraph(id, request);
        return Ok(paragraphResponse);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "USER,ADMIN")]
    public IActionResult DeleteParagraph(int id)
    {
        _paragraphService.DeleteParagraph(id);
        return Ok("Deleted");
    }

    [HttpGet("count/")]
    public IActionResult GetParagraphCount()
    {
        long count = _paragraphService.GetCount();
        return Ok(count);
    }
}
