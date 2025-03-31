namespace SpeedReaderAPI.DTOs.Question.Requests;
using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Attributes;
using SpeedReaderAPI.Constants;

public record QuestionUpdateRequest
(

    int? ParagraphId,
    [StringLength(ValidationConstants.MaxQuestionTextLength,
                MinimumLength = ValidationConstants.MinQuestionTextLength,
                ErrorMessage = "Question must be between {2} and {1} characters.")]
    string? QuestionText,
    [AnswerChoicesValidation]
    string[]? AnswerChoices,
    int? CorrectAnswerIndex
);
