namespace SpeedReaderAPI.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SpeedReaderAPI.Constants;
using SpeedReaderAPI.DTOs;

public class Paragraph : IComparable<Paragraph>
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Title is required.")]
    [StringLength(ValidationConstants.MaxTitleLength,
    MinimumLength = ValidationConstants.MinTitleLength,
    ErrorMessage = "Title must be between {2} and {1} characters.")]
    public string Title { get; set; }

    [ForeignKey(nameof(Article))]
    public int ArticleId { get; set; }

    [Required(ErrorMessage = "Text is required.")]
    [StringLength(ValidationConstants.MaxParagraphLength,
        MinimumLength = ValidationConstants.MinParagraphLength,
        ErrorMessage = "Text must be between {2} and {1} characters.")]
    public required string Text { get; set; }
    public string? ImageFileName { get; set; }
    public string? ImageFilePath { get; set; }
    public MimeType? ImageMimeType { get; set; }

    [NotMapped]
    public Image? Image
    {
        get
        {
            if (!string.IsNullOrEmpty(ImageFileName) && !string.IsNullOrEmpty(ImageFilePath) && ImageMimeType.HasValue)
            {
                return new Image(ImageFileName, ImageMimeType.Value, ImageFilePath);
            }
            return null;
        }
        set
        {
            if (value.HasValue)
            {
                ImageFilePath = value.Value.ImageFilePath;
                ImageFileName = value.Value.ImageFileName;
                ImageMimeType = value.Value.ImageMimeType;
            }
            else
            {
                ImageFilePath = null;
                ImageFileName = null;
                ImageMimeType = null;
            }
        }
    }
    public virtual Article? Article { get; set; }
    // ONE TO MANY
    public List<int> QuestionIds { get; set; } = [];
    public virtual List<Question> Questions { get; set; } = [];

    [ForeignKey(nameof(User))]  
    public long UserId { get; set; }
    public virtual User? User { get; set; }

    public int CompareTo(Paragraph other)
    {
        return Title.CompareTo(other.Title);
    }
}
