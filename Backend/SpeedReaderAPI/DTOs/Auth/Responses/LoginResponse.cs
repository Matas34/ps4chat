using System.Text.Json.Serialization;
using SpeedReaderAPI.Entities;

namespace SpeedReaderAPI.DTOs.Auth.Responses;

public class LoginResponse
{
    public long Id { get; set; }

    public required string Username { get; set; }
    public required Role Role { get; set; }
    public required string Token { get; set; }
}