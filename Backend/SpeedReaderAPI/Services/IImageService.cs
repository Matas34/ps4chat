using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.Entities;

namespace SpeedReaderAPI.Services;
public interface IImageService
{
    public Task<Image> Create(ImageUploadRequest request);
    public Stream? Get(Image image);
    public void Delete(Image image);
}
