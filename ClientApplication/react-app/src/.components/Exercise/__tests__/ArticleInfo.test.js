import React from 'react';
import { render, screen, act } from '@testing-library/react';
import ArticleInfo from '../AuxiliaryComponents/ArticleInfo';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';


beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en', // default language English
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          'exercise.articleInfo.title': 'Title',
          'exercise.articleInfo.author': 'Author',
          'exercise.articleInfo.publisher': 'Publisher',
          'exercise.articleInfo.link': 'Link',
          'exercise.articleInfo.addedBy': 'Added by',
        },
      },
      lt: {
        translation: {
          'exercise.articleInfo.title': 'Pavadinimas',
          'exercise.articleInfo.author': 'Autorius',
          'exercise.articleInfo.publisher': 'Leidėjas',
          'exercise.articleInfo.link': 'Nuoroda',
          'exercise.articleInfo.addedBy': 'Pridėjo',
        },
      },
    },
  });
});

describe('ArticleInfo Component', () => {
  const renderWithI18n = (language = 'en') => {
    act(() => {
      i18n.changeLanguage(language);
    });

    return render(
      <I18nextProvider i18n={i18n}>
        <ArticleInfo
          title="Kaip būti laimingu"
          author="Jonas Petrauskas"
          publisher="LRT"
          source="https://lrt.lt"
          addedBy="adas123"
        />
      </I18nextProvider>
    );
  };

  test('renders correctly in English', () => {
    renderWithI18n('en');

    expect(screen.getByText('Title:')).toBeInTheDocument();
    expect(screen.getByText('Author:')).toBeInTheDocument();
    expect(screen.getByText('Publisher:')).toBeInTheDocument();
    expect(screen.getByText('Link:')).toBeInTheDocument();

    expect(screen.getByText('Kaip būti laimingu')).toBeInTheDocument();
    expect(screen.getByText('Jonas Petrauskas')).toBeInTheDocument();
    expect(screen.getByText('LRT')).toBeInTheDocument();
    // expect(screen.getByText('adas123')).toBeInTheDocument();
  });

  test('renders correctly in Lithuanian', () => {
    renderWithI18n('lt');

    expect(screen.getByText('Pavadinimas:')).toBeInTheDocument();
    expect(screen.getByText('Autorius:')).toBeInTheDocument();
    expect(screen.getByText('Leidėjas:')).toBeInTheDocument();
    expect(screen.getByText('Nuoroda:')).toBeInTheDocument();
    // expect(screen.getByText('Pridėjo:')).toBeInTheDocument();
  });

  test('updates language dynamically', () => {
    renderWithI18n('en');

    expect(screen.getByText('Title:')).toBeInTheDocument();
    expect(screen.getByText('Author:')).toBeInTheDocument();
    expect(screen.getByText('Publisher:')).toBeInTheDocument();
    expect(screen.getByText('Link:')).toBeInTheDocument();
    // expect(screen.getByText('Added by:')).toBeInTheDocument();

    act(() => {
      i18n.changeLanguage('lt');
    });

    expect(screen.getByText('Pavadinimas:')).toBeInTheDocument();
    expect(screen.getByText('Autorius:')).toBeInTheDocument();
    expect(screen.getByText('Leidėjas:')).toBeInTheDocument();
    expect(screen.getByText('Nuoroda:')).toBeInTheDocument();
    // expect(screen.getByText('Pridėjo:')).toBeInTheDocument();

    act(() => {
      i18n.changeLanguage('en');
    });

    expect(screen.getByText('Title:')).toBeInTheDocument();
    expect(screen.getByText('Author:')).toBeInTheDocument();
    expect(screen.getByText('Publisher:')).toBeInTheDocument();
    expect(screen.getByText('Link:')).toBeInTheDocument();
    // expect(screen.getByText('Added by:')).toBeInTheDocument();
  });

  test('handles unsupported language gracefully', () => {
    renderWithI18n('de');

    expect(screen.getByText('Title:')).toBeInTheDocument();
    expect(screen.getByText('Author:')).toBeInTheDocument();
    expect(screen.getByText('Publisher:')).toBeInTheDocument();
    expect(screen.getByText('Link:')).toBeInTheDocument();
    // expect(screen.getByText('Added by:')).toBeInTheDocument();
  });
});
