namespace SpeedReaderAPI.DTOs.ArticleSession.Responses;

using SpeedReaderAPI.DTOs.ParagraphSession;

public record ArticleSessionResponse(
    long Id,
    int ArticleId,
    int Wpm,
    int CorrectQuestionCount,
    int TotalQuestionCount,
    DateTime Time, // When
    ParagraphSessionDto[] Paragraphs

);