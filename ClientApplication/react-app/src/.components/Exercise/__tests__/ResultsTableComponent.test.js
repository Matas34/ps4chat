import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResultsTable from '../ResultsTableComponent';
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'exercise.results.exerciseCompleted': 'Exercise Completed',
        'exercise.results.resultsInner': 'Your Results',
        'exercise.results.paragraphNr': 'Paragraph Nr',
        'exercise.results.words': 'Words',
        'exercise.results.time': 'Time',
        'commonUIelements.wpm': 'WPM',
        'exercise.results.questions': 'Questions',
        'exercise.results.inConclusion': 'In Conclusion',
        'exercise.results.yourCurrentReadingSpeed': 'Your Current Reading Speed',
        'exercise.results.yourAverageReadingSpeedDuringExercise': 'Your Average Reading Speed During Exercise',
        'exercise.results.goBackToCategories': 'Go Back to Categories',
      };
      return translations[key] || key;
    },
  }),
}));

describe('ResultsTable Component', () => {
  const mockProps = {
    timePerParagraph: [30.0, 40.0],
    wordsPerParagraph: [150, 200],
    usersWPM: 250,
    answersCorrectness: [true, false],
    calculateAverageWPM: jest.fn(() => 275),
    redirectToCategories: jest.fn(),
  };

  const setup = (props = {}) => {
    const combinedProps = { ...mockProps, ...props };
    return render(<ResultsTable {...combinedProps} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component with correct headings and translations', () => {
    setup();

    expect(screen.getByText('Exercise Completed!')).toBeInTheDocument();
    expect(screen.getByText('Your Results:')).toBeInTheDocument();
    expect(screen.getByText('Paragraph Nr.')).toBeInTheDocument();
    expect(screen.getByText('Words')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();
    expect(screen.getAllByText('WPM').length).toBeGreaterThan(0);
    expect(screen.getByText('Questions')).toBeInTheDocument();
    expect(screen.getByText('In Conclusion:')).toBeInTheDocument();
    //expect(screen.getByText('Your Current Reading Speed:')).toBeInTheDocument();
    expect(screen.getByText('Your Average Reading Speed During Exercise:')).toBeInTheDocument();
    expect(screen.getByText('Go Back to Categories')).toBeInTheDocument();
  });

  test('displays the correct data in the results table', () => {
    setup();

    expect(screen.getByText('1')).toBeInTheDocument(); // Paragraph number
    expect(screen.getByText('150')).toBeInTheDocument(); // Words in paragraph
    expect(screen.getByText('30.0s')).toBeInTheDocument(); // Time taken

    expect(screen.getByText('2')).toBeInTheDocument(); // Paragraph number
    expect(screen.getByText('200')).toBeInTheDocument(); // Words in paragraph
    expect(screen.getByText('40.0s')).toBeInTheDocument(); // Time taken
  });

  // test('displays average WPM and compares it to user\'s WPM', () => {
  //   setup();

  //   // User's current WPM
  //   expect(screen.getByText('Your Current Reading Speed:')).toBeInTheDocument();
  //   expect(screen.getByText('250')).toBeInTheDocument();

  //   expect(mockProps.calculateAverageWPM).toHaveBeenCalled();

  // });

  // test('handles case when averageWPM is null', () => {
  //   setup({ calculateAverageWPM: jest.fn(() => null) });

  //   expect(screen.getByText('Your Current Reading Speed:')).toBeInTheDocument();
  //   expect(screen.getByText('250')).toBeInTheDocument();
  // });

  test('clicking "Go Back to Categories" calls redirectToCategories', () => {
    setup();

    const button = screen.getByRole('button', { name: /Go Back to Categories/i });
    fireEvent.click(button);

    expect(mockProps.redirectToCategories).toHaveBeenCalledTimes(1);
  });

  // test('displays up arrow when WPM is above usersWPM', () => {
  //   setup();

  //   const upArrow = screen.getByText('↑');
  //   expect(upArrow).toBeInTheDocument();
  //   expect(upArrow).toHaveStyle('color: var(--color-lime)');
  // });

  test('Go Back to Categories button is enabled', () => {
    setup();
  
    const button = screen.getByRole('button', { name: /Go Back to Categories/i });
    expect(button).toBeEnabled();
  });
    
  // test('displays down arrow when WPM is below usersWPM', () => {
  //   const newTimePerParagraph = [60.0];
  //   const newWordsPerParagraph = [150];
  //   const newAnswersCorrectness = [true];

  //   setup({
  //     timePerParagraph: newTimePerParagraph,
  //     wordsPerParagraph: newWordsPerParagraph,
  //     usersWPM: 200,
  //     answersCorrectness: newAnswersCorrectness,
  //   });

  //   const downArrow = screen.getByText('↓');
  //   expect(downArrow).toHaveStyle('color: var(--color-pink)');
  // });
});
