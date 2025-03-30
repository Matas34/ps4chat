using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpeedReaderAPI.Entities;

public class User
{
    [Key]
    public long Id { get; set; }
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required Role Role { get; set; }

    public long WordsRead { get; set; } = 0;
    public long SecondsRead { get; set; } = 0;
    public long CorrectQuestions { get; set; } = 0;
    public long TotalQuestions { get; set; } = 0;
    public long ArticlesCountRead { get; set; } = 0;


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
}

public enum Role
{
    USER,
    ADMIN,
}


