using System.ComponentModel.DataAnnotations;

namespace SpeedReaderAPI.DTOs.Auth.Requests;

public class RegisterRequest
{
    [Required]
    public required string Username { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    public required string Password { get; set; }
}