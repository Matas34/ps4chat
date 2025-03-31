import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReadingExerciseComponent from '../ReadingExerciseComponent';
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'exercise.reading.endOfParagraph': 'End of Paragraph',
        'exercise.reading.pressStartToBeginPar': 'Press Start to Begin Paragraph',
        'exercise.reading.start': 'Start',
        'exercise.reading.goToQuestion': 'Go to Question',
        'commonUIelements.wpm': 'WPM',
      };
      return translations[key] || key;
    },
  }),
}));

describe('ReadingExerciseComponent', () => {
  const mockProps = {
    subject: 'English Literature',
    title: 'Reading Exercise',
    currentParagraphIndex: 0,
    paragraphs: ['Paragraph 1', 'Paragraph 2', 'Paragraph 3'],
    paragraphImageUrl: 'https://example.com/image.jpg',
    words: ['The', 'quick', 'brown', 'fox'],
    started: false,
    finished: false,
    currentWordIndex: 0,
    handleStart: jest.fn(),
    handleShowQuestion: jest.fn(),
    inputValue: 100,
    setInputValue: jest.fn(),
    logToLinear: (value) => value, // Identity function for simplicity
    linearToLog: (value) => value, // Identity function for simplicity
    worldRecordWPM: 200,
    valuetext: (value) => `${value} WPM`,
    questionButtonClicked: false,
  };

  const setup = (props = {}) => {
    const combinedProps = { ...mockProps, ...props };
    return render(<ReadingExerciseComponent {...combinedProps} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('displays start prompt and start button when not started', () => {
    setup();

    expect(screen.getByText('Press Start to Begin Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeInTheDocument();
    expect(startButton).not.toBeDisabled();
  });

  test('start button is disabled when already started', () => {
    setup({ started: true });

    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeDisabled();
  });

  test('displays the current word when started', () => {
    setup({ started: true, currentWordIndex: 1 });

    expect(screen.getByText('quick')).toBeInTheDocument();
    expect(screen.queryByText('Press Start to Begin Paragraph')).not.toBeInTheDocument();
  });

  test('shows "End of Paragraph" and yellow circle when finished', () => {
    setup({ started: true, finished: true, currentParagraphIndex: 0 });

    expect(screen.getByText('End of Paragraph')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // currentParagraphIndex + 1
    const yellowCircle = screen.getByText('1');
    expect(yellowCircle).toHaveClass('yellowCircle');
  });

  test('renders paragraph illustration image correctly', () => {
    setup();

    const image = screen.getByAltText('Paragraph Illustration');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('clicking "Start" button calls handleStart', () => {
    setup();

    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);

    expect(mockProps.handleStart).toHaveBeenCalledTimes(1);
  });

  test('WPM slider can be adjusted and calls setInputValue correctly', () => {
    setup();

    const slider = screen.getByLabelText('WPM Slider');
    fireEvent.change(slider, { target: { value: 150 } });

    expect(mockProps.setInputValue).toHaveBeenCalledWith(150);
  });

  test('WPM input can be changed and calls setInputValue with valid value', () => {
    setup();

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '120' } });

    expect(mockProps.setInputValue).toHaveBeenCalledWith(120);
  });


  test('"Go to Question" button is disabled when not finished or already clicked', () => {
    setup({ finished: false, questionButtonClicked: false });

    const goToQuestionButton = screen.getByRole('button', { name: /Go to Question/i });
    expect(goToQuestionButton).toBeDisabled();

    setup({ finished: true, questionButtonClicked: true });
    expect(goToQuestionButton).toBeDisabled();
  });

  test('"Go to Question" button is enabled when finished and not yet clicked', () => {
    setup({ finished: true, questionButtonClicked: false });

    const goToQuestionButton = screen.getByRole('button', { name: /Go to Question/i });
    expect(goToQuestionButton).toBeEnabled();
  });

  test('clicking "Go to Question" button calls handleShowQuestion', () => {
    setup({ finished: true, questionButtonClicked: false });

    const goToQuestionButton = screen.getByRole('button', { name: /Go to Question/i });
    fireEvent.click(goToQuestionButton);

    expect(mockProps.handleShowQuestion).toHaveBeenCalledTimes(1);
  });
});
