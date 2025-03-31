public record ValidationSettingsResponce (
    int MaxTitleLength,
    int MinTitleLength,
    int MaxQuestionTextLength,
    int MinQuestionTextLength,
    int MaxAnswerChoiceLength,
    int MinAnswerChoicesCount,
    int MaxParagraphLength,
    int MinParagraphLength
);