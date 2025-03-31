using AutoMapper;
using SpeedReaderAPI.Data;

public class ValidationSettingsService : IValidationSettingsService
{
    private readonly CombinedRepositories _context;
    private readonly IMapper _mapper;

    public ValidationSettingsService(ApplicationContext context, IMapper mapper)
    {
        _context = new CombinedRepositories(context);
        _mapper = mapper;
    }

    public ValidationSettingsResponce GetValidationSettings()
    {
        var settings = _context.ValidationSettings.GetValidationSettings();
        return _mapper.Map<ValidationSettingsResponce>(settings);
    }

    public ValidationSettingsResponce UpdateValidationSettings(ValidationSettingsUpdateRequest request)
    {
        var settings = _context.ValidationSettings.GetValidationSettings();
        settings = _mapper.Map(request, settings);
        _context.SaveChanges();
        return _mapper.Map<ValidationSettingsResponce>(settings);
    }
}