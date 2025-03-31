namespace SpeedReaderAPI.DTOs.ArticleSession.Requests;
using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.DTOs.ParagraphSession.Requests;

public record ArticleSessionCreateRequest
(
    [Required(ErrorMessage = "Article id is required.")]
    int? ArticleId,

    [Required(ErrorMessage = "Paragraph sessions are required.")]
    ParagraphSessionCreateRequest[]? ParagraphSessions
);