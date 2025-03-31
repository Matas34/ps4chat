using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace SpeedReaderAPI.Filters;


public class RequestValidationFilter : IActionFilter
{
    private readonly ILogger<RequestValidationFilter> _logger;

    public RequestValidationFilter(ILogger<RequestValidationFilter> logger)
    {
        _logger = logger;
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            _logger.LogWarning("Validation error on request to {Path}. Errors: {Errors}",
                context.HttpContext.Request.Path, context.ModelState);

            context.Result = new BadRequestObjectResult(new ProblemDetails
            {
                Title = "Validation Error",
                Detail = "One or more validation errors occurred.",
                Status = 410,
                Instance = context.HttpContext.Request.Path,
                Extensions = { ["errors"] = context.ModelState }
            });
        }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
    }
}