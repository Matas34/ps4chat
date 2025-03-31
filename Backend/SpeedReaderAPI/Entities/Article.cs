namespace SpeedReaderAPI.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SpeedReaderAPI.Constants;
public class Article : IComparable<Article>
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Title is required.")]
    [StringLength(ValidationConstants.MaxTitleLength,
            MinimumLength = ValidationConstants.MinTitleLength,
            ErrorMessage = "Title must be between {2} and {1} characters.")]
    public required string Title { get; set; }

    /// <summary>
    /// Gets or sets the title of the category.
    /// </summary>
    /// <remarks>
    /// This property is deprecated and may be removed in future versions.
    /// </remarks>
    /// <value>
    /// The title of the category.
    /// </value>
    /// <deprecated>
    /// This property is deprecated. Use <see cref="NewCategoryTitle"/> instead.
    /// </deprecated>
    /// 

    public string? OriginalAuthor { get; set; }
    public string? CategoryTitle { get; set; }
    public string? Publisher { get; set; }
    public string? Url { get; set; }
    public string? Language { get; set; }
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

    // ONE TO MANY
    public List<int> ParagraphIds { get; set; }  = [];
    public virtual ICollection<Paragraph> Paragraphs { get; set; }  = [];

    // ONE TO MANY
    public List<int> CategoryIds { get; set; }  = [];
    public virtual ICollection<Category> Categories { get; set; }  = [];


    [ForeignKey(nameof(User))]  
    public long UserId { get; set; }
    public virtual User? User { get; set; }

    public int CompareTo(Article other)
    {
        return Title.CompareTo(other.Title);
    }
}
