namespace SpeedReaderAPI.DTOs.ParagraphSession.Requests;
using System.ComponentModel.DataAnnotations;

public record ParagraphSessionCreateRequest
(
    [Required(ErrorMessage = "Paragraph id is required.")]
    int? ParagraphId,

    [Required(ErrorMessage = "Duration is required.")]
    [Range(1, int.MaxValue, ErrorMessage = "Duration must be a positive number.")]
    int? Duration, // Seconds

    [Required(ErrorMessage = "Wpm is required.")]
    [Range(1, int.MaxValue, ErrorMessage = "Duration must be a positive number.")]
    int? Wpm,

    [Required(ErrorMessage = "Correct question count is required.")]
    [Range(0, int.MaxValue, ErrorMessage = "Duration must >= 0.")]
    int? CorrectQuestionCount
);