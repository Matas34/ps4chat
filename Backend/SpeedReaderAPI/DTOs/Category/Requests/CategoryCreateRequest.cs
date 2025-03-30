using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;

public record CategoryCreateRequest
(
    [Required(ErrorMessage = "Title is required.")]
    [StringLength(ValidationConstants.MaxTitleLength,
        MinimumLength = ValidationConstants.MinTitleLength,
        ErrorMessage = "Title must be between {2} and {1} characters.")]
    string Title,
    string Text
);