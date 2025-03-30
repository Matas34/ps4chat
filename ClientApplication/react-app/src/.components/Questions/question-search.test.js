import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import QuestionSearch from './question-search';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'questions.search.searchQuestions': 'Search Questions',
        'questions.search.enterQuestionsTitle': 'Enter Questions Title',
        'questions.search.plsSelectQuestion': 'Please select a question.',
      };
      return translations[key] || key;
    },
  }),
}));


const mockSearch = jest.fn();
jest.mock('../../.controllers/.MainControllersExport', () => ({
  QuestionController: {
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

describe('QuestionSearch Component', () => {
  const mockOnQuestionSelected = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the search field with correct label and placeholder', () => {
    render(
      <QuestionSearch
        onQuestionSelected={mockOnQuestionSelected}
        questionFromOutside={null}
      />
    );

    const label = screen.getByLabelText('Search Questions');
    expect(label).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Enter Questions Title');
    expect(input).toBeInTheDocument();
  });

  test('updates search value and fetches options on input change', async () => {
    const mockQuestions = [
      { id: 1, text: 'Question 1' },
      { id: 2, text: 'Question 2' },
    ];
    mockSearch.mockResolvedValue({ questions: mockQuestions });

    render(
      <QuestionSearch
        onQuestionSelected={mockOnQuestionSelected}
        questionFromOutside={null}
      />
    );

    const input = screen.getByPlaceholderText('Enter Questions Title');

    await act(async () => {
      await userEvent.type(input, 'Quest');
    });

    expect(input.value).toBe('Quest');

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('Quest');
    });
  });

  test('calls handleSelection when a question is selected', async () => {
    const mockQuestions = [
      { id: 1, text: 'Question 1' },
      { id: 2, text: 'Question 2' },
    ];
    mockSearch.mockResolvedValue({ questions: mockQuestions });

    render(
      <QuestionSearch
        onQuestionSelected={mockOnQuestionSelected}
        questionFromOutside={null}
      />
    );

    const input = screen.getByPlaceholderText('Enter Questions Title');

    await act(async () => {
      await userEvent.type(input, 'Quest');
    });

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('Quest');
    });

    await act(async () => {
      await userEvent.type(input, '{arrowdown}{enter}');
    });

    expect(handleSelection).toHaveBeenCalled();
  });

  test('displays error popup when QuestionController.Search fails', async () => {
    const errorMessage = 'Network Error';
    mockSearch.mockRejectedValue(new Error(errorMessage));

    render(
      <QuestionSearch
        onQuestionSelected={mockOnQuestionSelected}
        questionFromOutside={null}
      />
    );

    const input = screen.getByPlaceholderText('Enter Questions Title');

    await act(async () => {
      await userEvent.type(input, 'Quest');
    });

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('Quest');
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
      <QuestionSearch
        onQuestionSelected={mockOnQuestionSelected}
        questionFromOutside={null}
      />
    );

    const input = screen.getByPlaceholderText('Enter Questions Title');

    await act(async () => {
      await userEvent.clear(input);
    });

    expect(input.value).toBe('');

    expect(mockSearch).not.toHaveBeenCalled();
  });

  test('displays validation feedback when input is invalid', async () => {
    render(
      <QuestionSearch
        onQuestionSelected={mockOnQuestionSelected}
        questionFromOutside={null}
      />
    );

    const input = screen.getByPlaceholderText('Enter Questions Title');

    await act(async () => {
      await userEvent.type(input, 'Invalid Question');
    });

  });

  test('pre-fills the input when questionFromOutside is provided', () => {
    const questionFromOutside = { id: 3, title: 'Existing Question' };

    render(
      <QuestionSearch
        onQuestionSelected={mockOnQuestionSelected}
        questionFromOutside={questionFromOutside}
      />
    );

    const input = screen.getByDisplayValue('Existing Question');
    expect(input).toBeInTheDocument();
  });
});
