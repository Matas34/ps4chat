using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;
namespace SpeedReaderAPI.Attributes;

public class AnswerChoicesValidationAttribute : ValidationAttribute
{

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value == null)
            return ValidationResult.Success;

        //is value an array of strings and does it contain the minimum amount of entries
        if (value is not string[] choices || choices.Length < ValidationConstants.MinAnswerChoicesCount)
            return new ValidationResult($"At least {ValidationConstants.MinAnswerChoicesCount} answer choices are required.");
        //no empty strings and limit array size
        foreach (var choice in choices)
        {
            if (string.IsNullOrWhiteSpace(choice))
                return new ValidationResult("Each answer choice must be non-empty.");
            if (choice.Length > ValidationConstants.MaxAnswerChoiceLength)
                return new ValidationResult($"Each answer choice cannot exceed {ValidationConstants.MaxAnswerChoiceLength} characters.");
        }

        return ValidationResult.Success;
    }
}
