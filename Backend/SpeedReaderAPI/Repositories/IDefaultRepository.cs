using SpeedReaderAPI.Entities;

public interface IDefaultRepository<T>
{
    long Count();
    T? FindById(int? id);
    List<T> GetPaged(int skip, int take);
    void Add(T entity);
    void Remove(T entity);
}
