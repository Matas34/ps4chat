using SpeedReaderAPI.Data;

public class DbValidationSettingsRepository : IValidationSettingsRepository
{
    private readonly ApplicationContext _context;

    public DbValidationSettingsRepository(ApplicationContext context)
    {
        _context = context;
    }

    public ValidationSettings GetValidationSettings()
    {
        var settings = _context.ValidationSettings.FirstOrDefault();
        if (settings == null)
        {
            // settings = new ValidationSettings();
            // _context.ValidationSettings.Add(settings);
            // _context.SaveChanges();
            throw new Exception("Validation settings not found");
        }
        return settings;
    }
}