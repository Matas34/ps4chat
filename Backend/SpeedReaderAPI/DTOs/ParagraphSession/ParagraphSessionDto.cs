namespace SpeedReaderAPI.DTOs.ParagraphSession;

public record ParagraphSessionDto
(
    int ParagraphId,
    int Wpm,
    int CorrectQuestionCount,
    int TotalQuestionCount
);