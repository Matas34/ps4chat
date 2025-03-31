import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Landing from './homePage';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'homepage.goToCategories': 'Go to Categories',
        'homepage.goToArticles': 'Go to Articles',
        'homepage.goToExercise': 'Go to Exercise',
        'homepage.flashingSentence': 'Welcome to Speedreader!',
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Landing Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
  };

  test('renders all navigation buttons with correct text', () => {
    setup();

    const categoriesButton = screen.getByTestId('go-to-categories-button');
    const articlesButton = screen.getByTestId('go-to-articles-button');
    const exerciseButton = screen.getByTestId('go-to-exercise-button');

    expect(categoriesButton).toBeInTheDocument();
    expect(categoriesButton).toHaveTextContent('Go to Categories');

    expect(articlesButton).toBeInTheDocument();
    expect(articlesButton).toHaveTextContent('Go to Articles');

    expect(exerciseButton).toBeInTheDocument();
    expect(exerciseButton).toHaveTextContent('Go to Exercise');
  });

  test('clicking "Go to Categories" button navigates to /categories', () => {
    setup();

    const categoriesButton = screen.getByTestId('go-to-categories-button');
    fireEvent.click(categoriesButton);

    expect(mockNavigate).toHaveBeenCalledWith('/categories');
  });

  test('clicking "Go to Articles" button navigates to /articles', () => {
    setup();

    const articlesButton = screen.getByTestId('go-to-articles-button');
    fireEvent.click(articlesButton);

    expect(mockNavigate).toHaveBeenCalledWith('/articles');
  });

  test('clicking "Go to Exercise" button navigates to /exercise', () => {
    setup();

    const exerciseButton = screen.getByTestId('go-to-exercise-button');
    fireEvent.click(exerciseButton);

    expect(mockNavigate).toHaveBeenCalledWith('/exercise');
  });
});
