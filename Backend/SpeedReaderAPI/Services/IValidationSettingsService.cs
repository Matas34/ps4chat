public interface IValidationSettingsService {
    ValidationSettingsResponce GetValidationSettings();
    ValidationSettingsResponce UpdateValidationSettings(ValidationSettingsUpdateRequest request);
}