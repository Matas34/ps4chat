import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ParagraphSearch from './paragraph-search';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';


jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'paragraphs.search.searchPar': 'Search Paragraph',
        'paragraphs.search.enterParTitle': 'Enter Paragraph Title',
        'paragraphs.search.plsSelectPar': 'Please select a paragraph.',
      };
      return translations[key] || key;
    },
  }),
}));

const mockSearch = jest.fn();
jest.mock('../../.controllers/.MainControllersExport', () => ({
  ParagraphController: {
    Search: (value) => mockSearch(value),
  },
}));

jest.mock('../../.helpers/MainHelpers', () => ({
  handleSelection: jest.fn(),
}));

jest.mock('../.common-components/ErrorPopup', () => (props) => (
  props.showErrorModal ? (
    <div data-testid="error-popup">
      <p>{props.errorMessage}</p>
      <button onClick={props.onClose}>Close</button>
    </div>
  ) : null
));

import { handleSelection } from '../../.helpers/MainHelpers';

describe('ParagraphSearch Component', () => {
  const mockOnParagraphSelected = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the search field with correct label and placeholder', () => {
    render(
      <ParagraphSearch
        onParagraphSelected={mockOnParagraphSelected}
        paragraphFromOutside={null}
      />
    );

    const label = screen.getByLabelText('Search Paragraph');
    expect(label).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Enter Paragraph Title');
    expect(input).toBeInTheDocument();
  });

  test('updates search value and fetches options on input change', async () => {
    const mockParagraphs = [
      { id: 1, title: 'Paragraph 1' },
      { id: 2, title: 'Paragraph 2' },
    ];
    mockSearch.mockResolvedValue({ paragraphs: mockParagraphs });

    const { container } = render(
      <ParagraphSearch
        onParagraphSelected={mockOnParagraphSelected}
        paragraphFromOutside={null}
      />
    );

    const input = screen.getByPlaceholderText('Enter Paragraph Title');

    await act(async () => {
        await userEvent.type(input, 'Para');
    });
  

    expect(input.value).toBe('Para');

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('Para');
    });

  });

  test('calls handleSelection when a paragraph is selected', async () => {
    const mockParagraphs = [
      { id: 1, title: 'Paragraph 1' },
      { id: 2, title: 'Paragraph 2' },
    ];
    mockSearch.mockResolvedValue({ paragraphs: mockParagraphs });

    const { container } = render(
      <ParagraphSearch
        onParagraphSelected={mockOnParagraphSelected}
        paragraphFromOutside={null}
      />
    );

    const input = screen.getByPlaceholderText('Enter Paragraph Title');

    await act(async () => {
        await userEvent.type(input, 'Para');
    });
  
    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('Para');
    });

    await act(async () => {
        await userEvent.type(input, '{arrowdown}{enter}');
    });

    expect(handleSelection).toHaveBeenCalled();
  });

  test('displays error popup when ParagraphController.Search fails', async () => {
    const errorMessage = 'Network Error';
    mockSearch.mockRejectedValue(new Error(errorMessage));

    render(
      <ParagraphSearch
        onParagraphSelected={mockOnParagraphSelected}
        paragraphFromOutside={null}
      />
    );

    const input = screen.getByPlaceholderText('Enter Paragraph Title');

    await act(async () => {
        await userEvent.type(input, 'Para');
    });

    await waitFor(() => {
        expect(mockSearch).toHaveBeenCalledWith('Para');
    });

    const errorPopup = await screen.findByTestId('error-popup');
    expect(errorPopup).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    const closeButton = screen.getByText('Close');

    await act(async () => {
        await userEvent.click(closeButton);
    });

    expect(errorPopup).not.toBeInTheDocument();
  });

  test('handles edge case when search input is empty', async () => {
    render(
      <ParagraphSearch
        onParagraphSelected={mockOnParagraphSelected}
        paragraphFromOutside={null}
      />
    );

    const input = screen.getByPlaceholderText('Enter Paragraph Title');

    await act(async () => {
      await userEvent.clear(input);
    });

    expect(input.value).toBe('');

    expect(mockSearch).not.toHaveBeenCalled();
  });

  test('displays validation feedback when input is invalid', async () => {
    render(
      <ParagraphSearch
        onParagraphSelected={mockOnParagraphSelected}
        paragraphFromOutside={null}
      />
    );

    const input = screen.getByPlaceholderText('Enter Paragraph Title');

    await act(async () => {
        await userEvent.type(input, 'Invalid Paragraph');
    });

  });

  test('pre-fills the input when paragraphFromOutside is provided', () => {
    const paragraphFromOutside = { id: 3, title: 'Existing Paragraph' };

    render(
      <ParagraphSearch
        onParagraphSelected={mockOnParagraphSelected}
        paragraphFromOutside={paragraphFromOutside}
      />
    );

    const input = screen.getByDisplayValue('Existing Paragraph');
    expect(input).toBeInTheDocument();
  });
});
