namespace SpeedReaderAPI.Services.Impl;

using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Constants;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.Exceptions;

public class ImageService : IImageService
{

    public ImageService()
    {
        string directoryPath = Path.Combine(Directory.GetCurrentDirectory(), AppConstants.uploadedDirName);
        
    }

    public async Task<Image> Create(ImageUploadRequest request)
    {
        IFormFile file = request.File;
       

        MimeType? mimeType = MimeTypeHelpers.GetMimeTypeFromFileName(file.FileName);
        
        string randomName = Path.GetRandomFileName();
        string filePath = Path.Combine(Directory.GetCurrentDirectory(), AppConstants.uploadedDirName, randomName);

        using (Stream stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }
        return new Image(file.FileName, (MimeType)mimeType, randomName);
    }
    public Stream? Get(Image img)
    {
        string filePath = Path.Combine(Directory.GetCurrentDirectory(), AppConstants.uploadedDirName, img.ImageFilePath);
        return new FileStream(filePath, FileMode.Open, FileAccess.Read);
    }
    public void Delete(Image image)
    {
        string filePath = Path.Combine(Directory.GetCurrentDirectory(), AppConstants.uploadedDirName, image.ImageFilePath);
        File.Delete(filePath);
    }
}