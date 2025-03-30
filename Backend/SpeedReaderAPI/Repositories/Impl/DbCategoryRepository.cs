using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;

public class DbCategoryRepository : IDefaultRepository<Category>
{
    private readonly ApplicationContext _context;

    public DbCategoryRepository(ApplicationContext context)
    {
        _context = context;
    }
    public long Count() => _context.Category.Count();

    public Category? FindById(int? id) => _context.Category.Include(a => a.User).FirstOrDefault(p => p.Id == id);

    public void Add(Category category) => _context.Category.Add(category);

    public void Remove(Category category) => _context.Category.Remove(category);

    public List<Category> GetPaged(int skip, int take) => _context.Category.Skip(skip).Take(take).Include(a => a.User).ToList();
}