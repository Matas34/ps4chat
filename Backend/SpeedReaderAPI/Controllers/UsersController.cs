namespace SpeedReaderAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.Services;
using Microsoft.AspNetCore.Authorization;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.Entities;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILogger<UsersController> _logger;

    public UsersController(ILogger<UsersController> logger,
     IUserService userService)
    {
        _logger = logger;
        _userService = userService;
    }

    [HttpGet("me")]
    [Authorize(Roles = "USER,ADMIN")]
    public IActionResult GetMyData()
    {
        var result = _userService.GetMyInfo();
        return Ok(result);
    }

    [HttpPost("img")]
    [Authorize(Roles = "USER,ADMIN")]
    public async Task<IActionResult> UploadImage([FromForm] ImageUploadRequest request)
    {
        var result = await _userService.UploadImage(-1, request);
        return Ok(result);
    }

    [HttpDelete("img")]
    [Authorize(Roles = "USER,ADMIN")]
    public IActionResult DeleteImage()
    {
        _userService.DeleteImage(-1);
        return Ok("Deleted");
    }

    [HttpGet("{id}/img")]
    public IActionResult GetImage(int id)
    {
        Image img = _userService.GetImage(id);
        return File(img.FileStream!, img.ImageMimeType.ToMimeString(), img.ImageFilePath);
    }

}