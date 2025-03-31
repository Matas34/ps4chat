namespace SpeedReaderAPI.Services;

using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.Entities;

public interface IServiceWithImage<T>
{
    Task<T> UploadImage(int id, ImageUploadRequest request);
    Image GetImage(int id);
    void DeleteImage(int id);
}
