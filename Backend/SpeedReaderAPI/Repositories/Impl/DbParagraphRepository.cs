using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;

public class DbParagraphRepository : IDefaultRepository<Paragraph>
{
    private readonly ApplicationContext _context;

    public DbParagraphRepository(ApplicationContext context)
    {
        _context = context;
    }
    public long Count() => _context.Paragraph.Count();

    public Paragraph? FindById(int? id) => _context.Paragraph.Include(a => a.User).FirstOrDefault(p => p.Id == id);

    public void Add(Paragraph paragraph) => _context.Paragraph.Add(paragraph);

    public void Remove(Paragraph paragraph) => _context.Paragraph.Remove(paragraph);

    public List<Paragraph> GetPaged(int skip, int take) => _context.Paragraph.Skip(skip).Take(take).Include(a => a.User).ToList();

}
