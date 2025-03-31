namespace SpeedReaderAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.DTOs.Auth.Requests;
using SpeedReaderAPI.DTOs.Auth.Responses;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Services;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _userService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(ILogger<AuthController> logger,
     IAuthService userService)
    {
        _logger = logger;
        _userService = userService;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest request)
    {
        _userService.Register(request);
        return Ok();
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        LoginResponse response = _userService.Login(request);
        return Ok(response);
    }
}