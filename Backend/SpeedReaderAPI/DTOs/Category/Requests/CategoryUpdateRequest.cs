using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;

public record CategoryUpdateRequest
(
    [StringLength(ValidationConstants.MaxTitleLength,
        MinimumLength = ValidationConstants.MinTitleLength,
        ErrorMessage = "Title must be between {2} and {1} characters.")]
    string? Title,
    string? Text
);