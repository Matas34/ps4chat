namespace SpeedReaderAPI.DTOs.Question.Requests;
using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Attributes;
using SpeedReaderAPI.Constants;

public record QuestionCreateRequest
(
    [Required(ErrorMessage = "Paragraph id is required.")]
    int ParagraphId,
    [Required(ErrorMessage = "Question is required.")]
    [StringLength(ValidationConstants.MaxQuestionTextLength,
                MinimumLength = ValidationConstants.MinQuestionTextLength,
                ErrorMessage = "Question must be between {2} and {1} characters.")]
    string QuestionText,

    [Required(ErrorMessage = "Answer choices are required.")]
    [AnswerChoicesValidation]
    string[] AnswerChoices,

    [Required(ErrorMessage = "Correct answer is required.")]
    int? CorrectAnswerIndex
);
