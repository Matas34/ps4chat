namespace SpeedReaderAPI.DTOs;
using System.ComponentModel.DataAnnotations;
public record ImageUploadRequest
{
    [Required(ErrorMessage = "Image file is required.")]
    public required IFormFile File { get; set; }
}