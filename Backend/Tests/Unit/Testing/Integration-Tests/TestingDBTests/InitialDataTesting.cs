using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using SpeedReaderAPI.Data;

namespace Unit;


public class InitialDataTesting : IClassFixture<PlaygroundApplicationFixture>
{
    private readonly PlaygroundApplicationFixture _fixture;

    public InitialDataTesting(PlaygroundApplicationFixture fixture)
    {
        _fixture = fixture;
        ensureDatabaseIsPrepared();
    }

    private void ensureDatabaseIsPrepared()
    {
        var scope = _fixture.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();

        // Ensure database is prepared synchronously
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        // Call SeedInitialData and ensure it completes before proceeding
        DBHelperMethods.SeedInitialData(context);
    }

    [Fact]
    public void GetFirstArticleIdTest()
    {
        var scope = _fixture.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
        DBHelperMethods.GetFirstArticleId(context);
    }

    [Fact]
    public void GetFirstParagraphIdTest()
    {
        var scope = _fixture.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
        DBHelperMethods.GetFirstParagraphId(context);
    }

    // try to delete the DB and see if it is created again
    [Fact]
    public void DeleteDatabaseTest()
    {
        var scope = _fixture.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();
        Assert.Throws<Exception>(() => DBHelperMethods.GetFirstArticleId(context));
    }

    // delete db, create and seed
    [Fact]
    public void SeedInitialDataTest()
    {
        var scope = _fixture.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();
        DBHelperMethods.SeedInitialData(context);
        DBHelperMethods.GetFirstArticleId(context);
    }
    
}