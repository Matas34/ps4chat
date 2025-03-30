using Microsoft.AspNetCore.Mvc;
using Serilog;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.Entities;

namespace SpeedReaderAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;
    private readonly ILogger<CategoryController> _logger;
    private readonly IDiagnosticContext _diagnosticContext;

    public CategoryController(ILogger<CategoryController> logger, ICategoryService categoryService, IDiagnosticContext diagnosticContext)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _diagnosticContext = diagnosticContext ?? throw new ArgumentNullException(nameof(diagnosticContext));
        _categoryService = categoryService;

        _diagnosticContext.Set("Controller", nameof(CategoryController));
    }

    [HttpPost("{id}/img")]
    public async Task<IActionResult> UploadImage(int id, [FromForm] ImageUploadRequest request)
    {
        CategoryResponse result = await _categoryService.UploadImage(id, request);
        return Ok(result);
    }

    [HttpDelete("{id}/img")]
    public IActionResult DeleteImage(int id)
    {
        _categoryService.DeleteImage(id);
        return Ok("Deleted");
    }

    [HttpGet("{id}/img")]
    public IActionResult GetImage(int id)
    {
        Image img = _categoryService.GetImage(id);
        return File(img.FileStream!, img.ImageMimeType.ToMimeString(), img.ImageFilePath);
    }
    
    [HttpPost]
    public IActionResult CreateCategory(CategoryCreateRequest createCategory)
    {
        CategoryResponse categoryResponse = _categoryService.CreateCategory(createCategory);
        return Ok(categoryResponse);
    }

    [HttpGet("{id}")]
    public IActionResult GetCategoryById(int id)
    {
        CategoryResponse categoryResponse = _categoryService.GetCategoryById(id);
        return Ok(categoryResponse);
    }

    [HttpGet("search/")]
    public IActionResult SearchCategories([FromQuery] QueryParameters queryParameters)
    {
        PageResponse<CategoryResponse> categories = _categoryService.SearchCategories(queryParameters);
        return Ok(categories);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateCategory(int id, CategoryUpdateRequest updateCategory)
    {
        CategoryResponse categoryResponse = _categoryService.UpdateCategory(id, updateCategory);
        return Ok(categoryResponse);
    }

    [HttpGet("count/")]
    public IActionResult GetCount()
    {
        long count = _categoryService.GetCount();
        return Ok(count);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteCategory(int id)
    {
        _categoryService.DeleteCategory(id);
        return Ok("Deleted");
    }
}