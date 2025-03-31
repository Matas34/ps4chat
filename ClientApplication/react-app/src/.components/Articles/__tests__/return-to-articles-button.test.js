import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const mockT = jest.fn((key) => {
  const translations = {
    'articles.returnToArticlesBtn.main': 'Return to Articles',
  };
  return translations[key] || key;
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockT,
  }),
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => mockNavigate,
}));

jest.mock('react-icons/io5', () => ({
  IoReturnUpBack: () => <div data-testid="return-icon" />,
}));

import ReturnToArticlesButton from '../Creating-Editing/return-to-articles-button';

describe('ReturnToArticlesButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the button with the correct icon', () => {
    render(<ReturnToArticlesButton />);

    const icon = screen.getByTestId('return-icon');
    expect(icon).toBeInTheDocument();

    expect(mockT).toHaveBeenCalledWith('articles.returnToArticlesBtn.main');
  });

  test('handles missing translation keys gracefully', () => {
    mockT.mockImplementation((key) => key);

    render(<ReturnToArticlesButton />);

    const button = screen.getByRole('button', { name: /articles.returnToArticlesBtn.main/i });
    expect(button).toBeInTheDocument();

    expect(mockT).toHaveBeenCalledWith('articles.returnToArticlesBtn.main');
  });
});
