import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import { I18nextProvider } from 'react-i18next';
import testI18n from '../../../test-i18n'; 
import LanguageSelector from '../LanguageSelector'; 
import { act } from 'react';

describe('LanguageSelector Component', () => {
  const setup = () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <LanguageSelector />
      </I18nextProvider>
    );
  };

  test('renders with English as the initial language', () => {
    setup();

    const initialButton = screen.getByRole('button', { name: /Select language\. Current language is English/i });
    expect(initialButton).toBeInTheDocument();
    expect(initialButton).toHaveTextContent('English');
    expect(testI18n.language).toBe('en');
  });

  test('changes language to Lithuanian', async () => {
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
  });

  test('changes language to German', async () => {
    setup();

    const initialButton = screen.getByRole('button', { name: /Select language\. Current language is Lietuvių/i });
    await act(async () => {
      await userEvent.click(initialButton);
    });

    const germanOption = screen.getByRole('button', { name: /Change language to Vokiečių/i });
    expect(germanOption).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(germanOption);
    });

    await waitFor(() => {
      const updatedButton = screen.getByRole('button', { name: /Select language\. Current language is Deutsch/i });
      expect(updatedButton).toBeInTheDocument();
      expect(updatedButton).toHaveTextContent('Deutsch');
    });
    expect(testI18n.language).toBe('de');
  });
});
