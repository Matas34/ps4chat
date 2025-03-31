namespace SpeedReaderAPI.DTOs.Question.Responses;

public class QuestionResponse
{
    public int ParagraphId { get; set; }
    public int Id { get; set; }
    public string QuestionText { get; set; }
    public string[] AnswerChoices { get; set; }
    public int CorrectAnswerIndex { get; set; }
    public string? ImageFileName { get; set; }
    public string? Author { get; set; }
}


