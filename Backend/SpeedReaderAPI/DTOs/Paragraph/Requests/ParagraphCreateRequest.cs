namespace SpeedReaderAPI.DTOs.Paragraph.Requests;
using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;

public record ParagraphCreateRequest(
    [Required(ErrorMessage = "Title is required.")]
    [StringLength(ValidationConstants.MaxTitleLength,
    MinimumLength = ValidationConstants.MinTitleLength,
    ErrorMessage = "Title must be between {2} and {1} characters.")]
    string Title,
    [Required(ErrorMessage = "Article id is required.")]
    int ArticleId,
    [Required(ErrorMessage = "Text is required.")]
    [StringLength(ValidationConstants.MaxParagraphLength,
        MinimumLength = ValidationConstants.MinParagraphLength,
        ErrorMessage = "Text must be between {2} and {1} characters.")]
    string Text
);
