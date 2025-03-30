public interface ICombinedRepository
{
    Task SaveChangesAsync();
    void SaveChanges();
}