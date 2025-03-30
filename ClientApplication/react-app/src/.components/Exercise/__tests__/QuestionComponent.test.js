import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionComponent from '../QuestionComponent';
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('QuestionComponent', () => {
  const mockProps = {
    question: 'What is the capital of France?',
    options: ['Berlin', 'London', 'Paris', 'Madrid'],
    questionImageUrl: 'https://example.com/image.jpg',
    currentParagraphIndex: 0,
  };

  test('renders the question and options', () => {
    render(<QuestionComponent {...mockProps} />);

    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();

    mockProps.options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });

    const image = screen.getByAltText('Question Illustration');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProps.questionImageUrl);
  });

  test('displays the current paragraph index correctly', () => {
    render(<QuestionComponent {...mockProps} />);

    const circle = screen.getByText('1'); // currentParagraphIndex + 1
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveClass('yellowCircle');

  });

  test('allows user to select an option and submit the answer', () => {
    const mockOnSubmit = jest.fn();
    render(<QuestionComponent {...mockProps} onSubmit={mockOnSubmit} />);

    // Find the option with the original index of 2 (Paris)
    const optionParis = screen.getByTestId('option-2');

    fireEvent.click(optionParis);

    // Check submit button is enabled
    const submitButton = screen.getByRole('button', { name: 'exercise.question.submitAnswer' });
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    // Verify that onSubmit was called with the correct index (2 for 'Paris')
    expect(mockOnSubmit).toHaveBeenCalledWith(2);

    // Verify that the submit button is now disabled
    expect(submitButton).toBeDisabled();
  });

  test('submit button is disabled until an option is selected', () => {
    render(<QuestionComponent {...mockProps} />);

    const submitButton = screen.getByRole('button', { name: 'exercise.question.submitAnswer' });
    expect(submitButton).toBeDisabled();

    const optionBerlin = screen.getByTestId('option-0');
    fireEvent.click(optionBerlin);

    expect(submitButton).not.toBeDisabled();
  });

  test('prevents selecting another option after submission', () => {
    const mockOnSubmit = jest.fn();
    render(<QuestionComponent {...mockProps} onSubmit={mockOnSubmit} />);

    const optionLondon = screen.getByTestId('option-1');
    fireEvent.click(optionLondon);

    const submitButton = screen.getByRole('button', { name: 'exercise.question.submitAnswer' });
    fireEvent.click(submitButton);

    // Try selecting another option after submission
    const optionMadrid = screen.getByTestId('option-3');
    fireEvent.click(optionMadrid);

    // Verify onSubmit was called only once
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
