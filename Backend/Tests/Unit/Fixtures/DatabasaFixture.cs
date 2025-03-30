using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;

public class DatabaseFixture : IDisposable
{
    public ApplicationContext Context { get; private set; }
    public DatabaseFixture()
    {
        // Create options for the in-memory database
        var DatabaseName = Guid.NewGuid().ToString();
        Context = ContextCreator.CreateContext(DatabaseName);
        Context.Database.EnsureCreated(); // Ensure the database is created
        DBHelperMethods.SeedInitialData(Context);
    }

    public void Dispose()
    {
        Context.Database.EnsureDeleted();
        Context.Dispose();
    }
}