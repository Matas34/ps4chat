import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuestionItem from '../../Listing/questionItem';
import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, 
  }),
}));

describe('QuestionItem Component', () => {
  const mockSelectThis = jest.fn();
  const mockDeleteThis = jest.fn();
  const mockEditThis = jest.fn();

  const defaultProps = {
    data: { text: 'Test Question' },
    settings: {
      showSelectButton: true,
      showDeleteButton: true,
      showEditButton: true,
    },
    selectThis: mockSelectThis,
    deleteThis: mockDeleteThis,
    editThis: mockEditThis,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component with the question text', () => {
    render(<QuestionItem {...defaultProps} />);

    expect(screen.getByText('Test Question')).toBeInTheDocument();
  });

  test('renders the Select button and calls the correct function on click', () => {
    render(<QuestionItem {...defaultProps} />);

    const selectButton = screen.getByText('commonUIelements.select');
    expect(selectButton).toBeInTheDocument();

    fireEvent.click(selectButton);
    expect(mockSelectThis).toHaveBeenCalledTimes(1);
  });

  test('renders the Delete button and calls the correct function on click', () => {
    render(<QuestionItem {...defaultProps} />);

    const deleteButton = screen.getByText('commonUIelements.delete');
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(mockDeleteThis).toHaveBeenCalledTimes(1);
  });

  test('renders the Edit button with an icon and calls the correct function on click', () => {
    render(<QuestionItem {...defaultProps} />);

    const editButton = screen.getByText('commonUIelements.edit');
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);
    expect(mockEditThis).toHaveBeenCalledTimes(1);
  });

  test('does not render Select button if settings.showSelectButton is false', () => {
    const props = {
      ...defaultProps,
      settings: {
        ...defaultProps.settings,
        showSelectButton: false,
      },
    };

    render(<QuestionItem {...props} />);

    const selectButton = screen.queryByText('commonUIelements.select');
    expect(selectButton).not.toBeInTheDocument();
  });

  test('does not render Delete button if settings.showDeleteButton is false', () => {
    const props = {
      ...defaultProps,
      settings: {
        ...defaultProps.settings,
        showDeleteButton: false,
      },
    };

    render(<QuestionItem {...props} />);

    const deleteButton = screen.queryByText('commonUIelements.delete');
    expect(deleteButton).not.toBeInTheDocument();
  });

  test('does not render Edit button if settings.showEditButton is false', () => {
    const props = {
      ...defaultProps,
      settings: {
        ...defaultProps.settings,
        showEditButton: false,
      },
    };

    render(<QuestionItem {...props} />);

    const editButton = screen.queryByText('commonUIelements.edit');
    expect(editButton).not.toBeInTheDocument();
  });
});
