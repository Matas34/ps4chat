using SpeedReaderAPI.Entities;

namespace SpeedReaderAPI.Services;


public interface ITokenService {
    string CreateToken(User user);
}