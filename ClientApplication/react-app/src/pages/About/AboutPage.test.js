import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './AboutPage';  
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, 
   }),
}));

describe('About Component', () => {
  test('renders About component with translation', () => {
    render(<About />);

    expect(screen.getByText('aboutPage.title')).toBeInTheDocument();
    expect(screen.getByText('aboutPage.teamIntroduction')).toBeInTheDocument();
    expect(screen.getByText('aboutPage.meetTeam')).toBeInTheDocument();
    
   expect(screen.getByText('aboutPage.conclusion')).toBeInTheDocument();
  });
  test('checks dynamic styles and colors', () => {
    render(<About />);
    const tadasElement = screen.getByText('Tadas');
    expect(tadasElement).toHaveStyle('color: var(--color-lime-light)');
    const dariusElement = screen.getByText('Darius');
    expect(dariusElement).toHaveStyle('color: var(--color-teal-light)');
    const arnasElement = screen.getByText('Arnas');
    expect(arnasElement).toHaveStyle('color: var(--color-purple-light)');
    const adrianElement = screen.getByText('Adrian');
    expect(adrianElement).toHaveStyle('color: var(--color-amber-light)');
  });
});