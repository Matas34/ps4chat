import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FeedbackMessage from '../AuxiliaryComponents/FeedbackMessage'; // Adjust the path as necessary
import '@testing-library/jest-dom';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'exercise.message.nextParagraph': 'Next Paragraph',
        'exercise.message.finish': 'Finish',
      };
      return translations[key] || key;
    },
  }),
}));

describe('FeedbackMessage Component', () => {
  const mockHandleNext = jest.fn();
  const paragraphs = ['Paragraph 1', 'Paragraph 2', 'Paragraph 3'];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the feedback message correctly', () => {
    render(
      <FeedbackMessage
        feedbackMessage="Correct! Well done."
        currentParagraphIndex={1}
        paragraphs={paragraphs}
        handleNextParagraphOrQuestion={mockHandleNext}
      />
    );

    const message = screen.getByText('Correct! Well done.');
    expect(message).toBeInTheDocument();
  });

  test('calls handleNextParagraphOrQuestion when the button is clicked', () => {
    render(
      <FeedbackMessage
        feedbackMessage="Correct! Well done."
        currentParagraphIndex={1}
        paragraphs={paragraphs}
        handleNextParagraphOrQuestion={mockHandleNext}
      />
    );

    const button = screen.getByRole('button', { name: /Next Paragraph/i });
    fireEvent.click(button);

    expect(mockHandleNext).toHaveBeenCalledTimes(1);
  });

  test('renders Finish button on the last paragraph', () => {
    render(
      <FeedbackMessage
        feedbackMessage="Keep going!"
        currentParagraphIndex={paragraphs.length - 1}
        paragraphs={paragraphs}
        handleNextParagraphOrQuestion={mockHandleNext}
      />
    );
  
    const button = screen.getByRole('button', { name: /Finish/i });
    expect(button).toBeInTheDocument();
  });
  

  test('handles edge case when there are no paragraphs', () => {
    render(
      <FeedbackMessage
        feedbackMessage="Correct! Well done."
        currentParagraphIndex={0}
        paragraphs={[]}
        handleNextParagraphOrQuestion={mockHandleNext}
      />
    );

    const button = screen.getByRole('button', { name: /Finish/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockHandleNext).toHaveBeenCalledTimes(1);
  });
});
