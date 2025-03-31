
namespace SpeedReaderAPI.Entities;

public struct Image(string fileName, MimeType mimeType, string imageFilePath)
{
    public string ImageFileName { get; set; } = fileName;
    public string ImageFilePath { get; set; } = imageFilePath;
    public MimeType ImageMimeType { get; set; } = mimeType;
    public Stream? FileStream { get; set; }
}

public enum MimeType
{
    Jpeg,
    Png,
    Gif,
    Bmp,
    Webp,
    Svg

}

public static class MimeTypeHelpers
{
    public static string ToMimeString(this MimeType mimeType)
    {
        return mimeType switch
        {
            MimeType.Jpeg => "image/jpeg",
            MimeType.Png => "image/png",
            MimeType.Gif => "image/gif",
            MimeType.Bmp => "image/bmp",
            MimeType.Webp => "image/webp",
            MimeType.Svg => "image/svg+xml",
            _ => throw new ArgumentOutOfRangeException(nameof(mimeType), mimeType, null)
        };
    }

    public static MimeType? GetMimeTypeFromFileName(string fileName)
    {
        var extension = Path.GetExtension(fileName)?.ToLowerInvariant();

        return extension switch
        {
            ".jpg" or ".jpeg" => MimeType.Jpeg,
            ".png" => MimeType.Png,
            ".gif" => MimeType.Gif,
            ".bmp" => MimeType.Bmp,
            ".webp" => MimeType.Webp,
            ".svg" => MimeType.Svg,
            _ => null
        };
    }

}


