namespace SpeedReaderAPI.DTOs.Paragraph.Requests;
using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;

public record ParagraphUpdateRequest(
    [StringLength(ValidationConstants.MaxTitleLength,
    MinimumLength = ValidationConstants.MinTitleLength,
    ErrorMessage = "Title must be between {2} and {1} characters.")]
    string? Title,
    int? ArticleId,
    [StringLength(ValidationConstants.MaxParagraphLength,
        MinimumLength = ValidationConstants.MinParagraphLength,
        ErrorMessage = "Text must be between {2} and {1} characters.")]
    string? Text,
    List<int>? QuestionIds
    );
