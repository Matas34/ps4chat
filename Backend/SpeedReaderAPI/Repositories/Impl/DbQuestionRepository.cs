using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;

public class DbQuestionRepository : IDefaultRepository<Question>
{
    private readonly ApplicationContext _context;

    public DbQuestionRepository(ApplicationContext context)
    {
        _context = context;
    }

    public Question? FindById(int? id) => _context.Question.Include(a => a.User).FirstOrDefault(q => q.Id == id);

    public void Add(Question question) => _context.Question.Add(question);

    public void Remove(Question question) => _context.Question.Remove(question);

    public long Count() => _context.Question.Count();

    public List<Question> GetPaged(int skip, int take) => _context.Question.Skip(skip).Take(take).Include(a => a.User).ToList();
    
}
