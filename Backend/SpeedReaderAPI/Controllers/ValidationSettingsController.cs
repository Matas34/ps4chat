using Microsoft.AspNetCore.Mvc;
using Serilog;

[ApiController]
[Route("api/[controller]")]
public class ValidationSettingsController : ControllerBase
{
    private readonly IValidationSettingsService _validationSettings;
    private readonly ILogger<ValidationSettingsController> _logger;
    private readonly IDiagnosticContext _diagnosticContext;

    public ValidationSettingsController(ILogger<ValidationSettingsController> logger,
        IValidationSettingsService validationSettings, IDiagnosticContext diagnosticContext)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _diagnosticContext = diagnosticContext ?? throw new ArgumentNullException(nameof(diagnosticContext));
        _validationSettings = validationSettings;

        _diagnosticContext.Set("Controller", nameof(ValidationSettingsController));
    }

    [HttpGet]
    public IActionResult GetValidationSettings()
    {
        var settings = _validationSettings.GetValidationSettings();
        return Ok(settings);
    }

    [HttpPut]
    public IActionResult UpdateValidationSettings(ValidationSettingsUpdateRequest request)
    {
        var settings = _validationSettings.UpdateValidationSettings(request);
        return Ok(settings);
    }
}