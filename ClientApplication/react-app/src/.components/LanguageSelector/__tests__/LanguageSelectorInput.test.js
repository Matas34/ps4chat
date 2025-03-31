import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageSelectInput from '../LanguageSelectInput';
import '@testing-library/jest-dom';
import { act } from 'react';

jest.mock('country-flag-icons/react/3x2', () => ({
  GB: () => <span data-testid="flag-gb">GB Flag</span>,
  LT: () => <span data-testid="flag-lt">LT Flag</span>,
  DE: () => <span data-testid="flag-de">DE Flag</span>,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('LanguageSelectInput Component', () => {
  const setup = (initialLanguage = 'en') => {
    const onSelectLanguage = jest.fn();
    render(
      <LanguageSelectInput
        selectedLanguage={initialLanguage}
        onSelectLanguage={onSelectLanguage}
      />
    );
    return { onSelectLanguage };
  };

  test('renders with GB flag and EN code by default', () => {
    setup();

    expect(screen.getByTestId('flag-gb')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  test('selecting LT updates the selected language to LT', async () => {
    const { onSelectLanguage } = setup();

    // Open the dropdown
    const toggleButton = screen.getByRole('button');
    await act(async () => {
        await userEvent.click(toggleButton);
    });

    const ltOption = screen.getByText('LT');
    await act(async () => {
        await userEvent.click(ltOption);
    });

    // Ensure the onSelectLanguage callback was called with 'lt'
    expect(onSelectLanguage).toHaveBeenCalledWith('lt');
  });

  test('selecting DE updates the selected language to DE', async () => {
    const { onSelectLanguage } = setup();

    const toggleButton = screen.getByRole('button');
    await act(async () => {
        await userEvent.click(toggleButton);
    });

    const deOption = screen.getByText('DE');
    await act(async () => {
        await userEvent.click(deOption);
    });

    // Ensure the onSelectLanguage callback was called with 'de'
    expect(onSelectLanguage).toHaveBeenCalledWith('de');
  });
});
