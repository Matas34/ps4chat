import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react';
import testI18n from './test-i18n';

describe('App.js Component tests', () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  };

  test('renders the Navbar', () => {
    setup();

    const logoElement = screen.getByAltText('logo');
    const siteNameElement = screen.getByText('Speedreader.com');
    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    //const profileIcon = screen.getByTestId('profile-icon');
    const languageSelector = screen.getByTestId('language-selector');

    expect(logoElement).toBeInTheDocument();
    expect(siteNameElement).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    //expect(profileLink).toBeInTheDocument();
    //expect(profileIcon).toBeInTheDocument();
    expect(languageSelector).toBeInTheDocument();
  });

  test('changes language to Lithuanian and checks if Navbar elements language changed', async () => {
    setup();

    const initialButton = screen.getByRole('button', { name: /Select language\. Current language is English/i });
    await act(async () => {
      await userEvent.click(initialButton);
    });

    const lithuanianOption = screen.getByRole('button', { name: /Change language to Lithuanian/i });
    expect(lithuanianOption).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(lithuanianOption);
    });

    await waitFor(() => {
      const updatedButton = screen.getByRole('button', { name: /Select language\. Current language is Lietuvių/i });
      expect(updatedButton).toBeInTheDocument();
      expect(updatedButton).toHaveTextContent('Lietuvių');
    });

    expect(testI18n.language).toBe('lt');

    const homeLink = screen.getByText('Namai');
    const aboutLink = screen.getByText('Apie mus');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });

  /*
  jest.mock('./pages/HomePage/homePage', () => () => <div>homepage.flashingSentence</div>);

  test('renders Landing component on default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const landingElement = screen.getByText('homepage.flashingSentence');
    expect(landingElement).toBeInTheDocument();
  });
  */
});
