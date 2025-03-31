import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnswerItem from '../answerItem'

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

describe('AnswerItem Component', () => {
    const defaultProps = {
        index: 0,
        articleText: 'Sample Answer',
        sendBackText: jest.fn(),
        deleteAnswer: jest.fn(),
        setCorrect: jest.fn(),
        correctAnswerIndex: -1,
    };

    test('renders correctly with initial props', () => {
        render(<AnswerItem {...defaultProps} />);

        expect(screen.getByLabelText(/questions.answerItem.answer/i)).toBeInTheDocument();

        const textarea = screen.getByPlaceholderText('questions.answerItem.enterAnswer');
        expect(textarea).toBeInTheDocument();
        expect(textarea).toHaveValue('Sample Answer');
    });

    test('calls sendBackText when text is updated', () => {
        render(<AnswerItem {...defaultProps} />);

        const textarea = screen.getByPlaceholderText('questions.answerItem.enterAnswer');
        fireEvent.change(textarea, { target: { value: 'Updated Answer' } });

        expect(defaultProps.sendBackText).toHaveBeenCalledWith(0, 'Updated Answer');
    });

    test('calls setCorrect when "Correct" button is clicked', () => {
        render(<AnswerItem {...defaultProps} />);

        const correctButton = screen.getByText('questions.answerItem.correct');
        fireEvent.click(correctButton);

        expect(defaultProps.setCorrect).toHaveBeenCalledWith(0);
    });

    test('calls deleteAnswer when "Delete" button is clicked', () => {
        render(<AnswerItem {...defaultProps} />);

        const deleteButton = screen.getByText('questions.answerItem.delete');
        fireEvent.click(deleteButton);

        expect(defaultProps.deleteAnswer).toHaveBeenCalledWith(0);
    });

    test('displays correctAnswerIndex indicator when index matches', () => {
        const props = { ...defaultProps, correctAnswerIndex: 0 };
        render(<AnswerItem {...props} />);

        expect(screen.getByText(/questions.answerItem.answer/)).toContainHTML('<svg');
    });

    test('updates text state when articleText prop changes', () => {
        const { rerender } = render(<AnswerItem {...defaultProps} />);

        const textarea = screen.getByPlaceholderText('questions.answerItem.enterAnswer');
        expect(textarea).toHaveValue('Sample Answer');

        rerender(<AnswerItem {...defaultProps} articleText="New Answer" />);
        expect(textarea).toHaveValue('New Answer');
    });

    test('shows validation feedback when required field is empty and submitted', () => {
        render(<AnswerItem {...defaultProps} />);

        const textarea = screen.getByPlaceholderText('questions.answerItem.enterAnswer');
        fireEvent.change(textarea, { target: { value: '' } });

        fireEvent.invalid(textarea);

        expect(screen.getByText(/questions.answerItem.plsEnterAnswer/)).toBeInTheDocument();
    });
});
