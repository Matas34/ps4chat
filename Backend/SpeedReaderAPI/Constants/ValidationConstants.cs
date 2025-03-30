namespace SpeedReaderAPI.Constants;

public static class ValidationConstants
{
    public const int MaxTitleLength = 255;
    public const int MinTitleLength = 3;
    public const int MaxQuestionTextLength = 255;
    public const int MinQuestionTextLength = 5;

    public const int MaxAnswerChoiceLength = 255;
    public const int MinAnswerChoicesCount = 2;

    public const int MaxParagraphLength = 1500;
    public const int MinParagraphLength = 10;
}
