using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using SpeedReaderAPI.Data;

public class ContextCreator {
    public static ApplicationContext CreateContext(string dbName = Constants.TestDatabaseName)
    {
        // Create options for the in-memory database
        var options = new DbContextOptionsBuilder<ApplicationContext>()
            .UseInMemoryDatabase(databaseName: dbName) // Name of the in-memory database
            .ConfigureWarnings(warnings => warnings.Ignore(InMemoryEventId.TransactionIgnoredWarning))
            .Options;

        // Create the context using the options
        var context = new ApplicationContext(options);
        context.Database.EnsureCreated(); // Ensure the database is created
        return context;
    }

    public static ApplicationContext CreateIsolatedContext()
    {
        var databaseName =Guid.NewGuid().ToString();

        // Create options for the in-memory database
        var options = new DbContextOptionsBuilder<ApplicationContext>()
            .UseInMemoryDatabase(databaseName: databaseName) // Name of the in-memory database
            .ConfigureWarnings(warnings => warnings.Ignore(InMemoryEventId.TransactionIgnoredWarning))
            .Options;

        // Create the context using the options
        var context = new ApplicationContext(options);
        context.Database.EnsureCreated(); // Ensure the database is created

        return context;
    }
}