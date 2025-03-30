using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;

public class ValidationSettings
{
    [Key]
    public int Id { get; set; } // Primary key for EF Core

    [Required(ErrorMessage = "Max title length is required.")]
    [Range(1, int.MaxValue, ErrorMessage = "Max title length must be at least 1.")]
    public int MaxTitleLength { get; set; }

    [Required(ErrorMessage = "Min title length is required.")]
    [Range(1, int.MaxValue, ErrorMessage = "Min title length must be at least 1.")]
    public int MinTitleLength { get; set; }

    [Required(ErrorMessage = "Max question text length is required.")]
    [Range(1, int.MaxValue, ErrorMessage = "Max question text length must be at least 1.")]
    public int MaxQuestionTextLength { get; set; }

    [Required(ErrorMessage = "Min question text length is required.")]
    [Range(1, int.MaxValue, ErrorMessage = "Min question text length must be at least 1.")]
    public int MinQuestionTextLength { get; set; }

    [Required(ErrorMessage = "Max answer choice length is required.")]
    [Range(1, int.MaxValue, ErrorMessage = "Max answer choice length must be at least 1.")]
    public int MaxAnswerChoiceLength { get; set; }

    [Required(ErrorMessage = "Min answer choices count is required.")]
    [Range(1, int.MaxValue, ErrorMessage = "Min answer choices count must be at least 1.")]
    public int MinAnswerChoicesCount { get; set; }

    [Required(ErrorMessage = "Max paragraph length is required.")]
    [Range(1, int.MaxValue, ErrorMessage = "Max paragraph length must be at least 1.")]
    public int MaxParagraphLength { get; set; }

    [Required(ErrorMessage = "Min paragraph length is required.")]
    [Range(1, int.MaxValue, ErrorMessage = "Min paragraph length must be at least 1.")]
    public int MinParagraphLength { get; set; }
}