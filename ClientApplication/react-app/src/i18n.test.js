import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

describe('i18n Initialization', () => {
  beforeAll(() => {
    i18n.use(initReactI18next).init({
      fallbackLng: 'en',
      lng: 'en', // Default language
      interpolation: {
        escapeValue: false,
      },
      resources: {
        en: { translation: { key: 'Hello' } },
        lt: { translation: { key: 'Sveiki' } },
      },
    });
  });

  test('should return correct translation for default language', () => {
    expect(i18n.t('key')).toBe('Hello');
  });

  test('switch to Lithuanian and return correct translation', async () => {
    await i18n.changeLanguage('lt');
    expect(i18n.language).toBe('lt');
    expect(i18n.t('key')).toBe('Sveiki');
  });

  test('fall back to English if translation is missing', async () => {
    await i18n.changeLanguage('fr');
    expect(i18n.language).toBe('fr');
    expect(i18n.t('key')).toBe('Hello'); // Falls back to English
  });
});
