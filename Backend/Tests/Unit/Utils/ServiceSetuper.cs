using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SpeedReaderAPI.Data;

public class ServiceSetuper
{
    public static void SetupServices(IServiceCollection services, bool randomName = true)
    {
        // Remove the existing DbContext registration, if any.
        var descriptor = services.SingleOrDefault(
            d => d.ServiceType == typeof(DbContextOptions<ApplicationContext>));

        if (descriptor != null)
        {
            services.Remove(descriptor);
        }

        var databaseName = randomName ? Guid.NewGuid().ToString() : Constants.TestDatabaseName;
        // Add the in-memory database context for testing
        services.AddDbContext<ApplicationContext>(options =>
        {
            options.UseInMemoryDatabase(databaseName);
        });

        InfoMessagePrinter.DisplaySetupDBName(databaseName);
    }
}