using System.ComponentModel.DataAnnotations;

public record ValidationSettingsUpdateRequest (
    [Range(1, int.MaxValue, ErrorMessage = "Max title length must be at least 1.")]
    int? MaxTitleLength,

    [Range(1, int.MaxValue, ErrorMessage = "Min title length must be at least 1.")]
    int? MinTitleLength,

    [Range(1, int.MaxValue, ErrorMessage = "Max question text length must be at least 1.")]
    int? MaxQuestionTextLength,

    [Range(1, int.MaxValue, ErrorMessage = "Min question text length must be at least 1.")]
    int? MinQuestionTextLength,

    [Range(1, int.MaxValue, ErrorMessage = "Max answer choice length must be at least 1.")]
    int? MaxAnswerChoiceLength,

    [Range(1, int.MaxValue, ErrorMessage = "Min answer choices count must be at least 1.")]
    int? MinAnswerChoicesCount,

    [Range(1, int.MaxValue, ErrorMessage = "Max paragraph length must be at least 1.")]
    int? MaxParagraphLength,
    
    [Range(1, int.MaxValue, ErrorMessage = "Min paragraph length must be at least 1.")]
    int? MinParagraphLength
);