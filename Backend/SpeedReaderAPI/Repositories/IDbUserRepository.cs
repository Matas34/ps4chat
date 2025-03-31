using SpeedReaderAPI.Entities;

public interface IDbUserRepository : IDefaultRepository<User>
{
    public User? FindByEmail(string email);
    public User? FindById(long? id);
}