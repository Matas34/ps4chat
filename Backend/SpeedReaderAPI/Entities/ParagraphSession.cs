using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpeedReaderAPI.Entities;

public class ParagraphSession
{
    [Key]
    public long Id { get; set; }

    [ForeignKey(nameof(ArticleSession))]
    public long ArticleSessionId { get; set; }

    [ForeignKey(nameof(Paragraph))]
    public int ParagraphId { get; set; }

    public int DurationInSeconds { get; set; }

    public int Wpm { get; set; }

    public int CorrectQuestionCount { get; set; }

    public int TotalQuestionCount { get; set; }

    public ArticleSession? ArticleSession { get; set; }
    public Paragraph? Paragraph { get; set; }
}