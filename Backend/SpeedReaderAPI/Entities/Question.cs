namespace SpeedReaderAPI.Entities;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SpeedReaderAPI.Attributes;
using SpeedReaderAPI.Constants;

public class Question : IComparable<Question>
{
    [Key]
    public int Id { get; set; }

    [ForeignKey(nameof(Paragraph))]
    public int ParagraphId { get; set; }

    [Required(ErrorMessage = "Question text is required.")]
    [StringLength(ValidationConstants.MaxQuestionTextLength,
        MinimumLength = ValidationConstants.MinQuestionTextLength,
        ErrorMessage = "Question text must be between {2} and {1} characters.")]
    public required string QuestionText { get; set; }

    [AnswerChoicesValidation]
    public required string[] AnswerChoices { get; set; }

    [Required(ErrorMessage = "Correct answer choice is required.")]
    [StringLength(ValidationConstants.MaxAnswerChoiceLength,
        ErrorMessage = "Correct answer choice cannot exceed {1} characters.")]
    public int CorrectAnswerIndex { get; set; }

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

    public virtual Paragraph? Paragraph { get; set; }

    [ForeignKey(nameof(User))]  
    public long UserId { get; set; }
    public virtual User? User { get; set; }


    public int CompareTo(Question other)
    {
        return Id.CompareTo(other.Id);
    }
}
