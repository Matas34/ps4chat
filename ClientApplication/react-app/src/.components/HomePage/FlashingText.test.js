import React from 'react';
import { render, screen, act } from '@testing-library/react';
import FlashingText from './FlashingText'; 
import '@testing-library/jest-dom';

jest.useFakeTimers();

describe('FlashingText Component', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  test('renders the initial word correctly', () => {
    render(<FlashingText sentence="The quick brown fox" />);

    const highlightedWord = screen.getByTestId('highlighted-word');
    expect(highlightedWord).toHaveTextContent('The');

    const currentWordDisplay = screen.getByTestId('current-word');
    expect(currentWordDisplay).toHaveTextContent('The');

    expect(highlightedWord).toHaveClass('highlight');

    const sentenceDisplay = screen.getByTestId('sentence-display');
    expect(sentenceDisplay).toHaveTextContent('The quick brown fox');
  });

  test('handles single-word sentence', () => {
    render(<FlashingText sentence="Hello" />);

    const highlightedWord = screen.getByTestId('highlighted-word');
    const currentWordDisplay = screen.getByTestId('current-word');

    expect(highlightedWord).toHaveTextContent('Hello');
    expect(currentWordDisplay).toHaveTextContent('Hello');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(highlightedWord).toHaveTextContent('Hello');
    expect(currentWordDisplay).toHaveTextContent('Hello');
  });

  test('highlights the current word only', () => {
    render(<FlashingText sentence="Highlight only current word" />);

    const highlightedWord = screen.getByTestId('highlighted-word');

    expect(highlightedWord).toHaveTextContent('Highlight');

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(highlightedWord).toHaveTextContent('only');
  });

});
