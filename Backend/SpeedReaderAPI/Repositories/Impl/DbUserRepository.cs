using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;

public class DbUserRepository : IDbUserRepository
{
    private readonly ApplicationContext _context;

    public DbUserRepository(ApplicationContext context)
    {
        _context = context;
    }
    
    public void Add(User entity)
    {
        _context.User.Add(entity);
    }

    public long Count()
    {
        return _context.User.Count();
    }

    public User? FindByEmail(string email)
    {
        return _context.User.FirstOrDefault(u => u.Email == email);
    }

    public User? FindById(int? id)
    {
        return FindById((long?) id);
    }

    public User? FindById(long? id)
    {
        return _context.User.FirstOrDefault(u => u.Id == id);
    }

    public List<User> GetPaged(int skip, int take)
    {
        return _context.User.Skip(skip).Take(take).ToList();
    }

    public void Remove(User entity)
    {
        _context.User.Remove(entity);
    }
}