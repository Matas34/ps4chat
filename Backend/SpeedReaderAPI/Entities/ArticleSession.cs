using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpeedReaderAPI.Entities;

public class ArticleSession
{
    [Key]
    public long Id { get; set; }

    [ForeignKey(nameof(User))]
    public long UserId { get; set; }

    [ForeignKey(nameof(Article))]
    public int ArticleId { get; set; }

    public DateTime Time { get; set; }

    public int Wpm { get; set; } = 0;
    public int CorrectQuestionCount { get; set; } = 0;
    public int TotalQuestionCount { get; set; } = 0;

    public User? User { get; set; }
    public Article? Article { get; set; }
}