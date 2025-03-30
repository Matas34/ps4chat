import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ParagraphItem from '../../Listing/paragraphItem'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('ParagraphItem', () => {
  const mockSelect = jest.fn();
  const mockDelete = jest.fn();
  const mockEdit = jest.fn();

  const mockData = {
    title: 'Test Paragraph Title',
  };

  const mockSettings = {
    showSelectButton: true,
    showDeleteButton: true,
    showEditButton: true,
  };

  test('renders the component with the correct title', () => {
    render(<ParagraphItem data={mockData} settings={mockSettings} selectThis={mockSelect} deleteThis={mockDelete} editThis={mockEdit} />);

    expect(screen.getByText(mockData.title)).toBeInTheDocument();
  });

  test('conditionally renders buttons based on settings', () => {
    render(<ParagraphItem data={mockData} settings={mockSettings} selectThis={mockSelect} deleteThis={mockDelete} editThis={mockEdit} />);

    expect(screen.getByText('commonUIelements.select')).toBeInTheDocument();
    expect(screen.getByText('commonUIelements.delete')).toBeInTheDocument();
    expect(screen.getByText('commonUIelements.edit')).toBeInTheDocument();
  });

  test('calls selectThis when select button is clicked', () => {
    render(<ParagraphItem data={mockData} settings={mockSettings} selectThis={mockSelect} deleteThis={mockDelete} editThis={mockEdit} />);
    
    fireEvent.click(screen.getByText('commonUIelements.select'));
    
    expect(mockSelect).toHaveBeenCalledTimes(1);
  });

  test('calls deleteThis when delete button is clicked', () => {
    render(<ParagraphItem data={mockData} settings={mockSettings} selectThis={mockSelect} deleteThis={mockDelete} editThis={mockEdit} />);
    
    fireEvent.click(screen.getByText('commonUIelements.delete'));
    
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  test('calls editThis when edit button is clicked', () => {
    render(<ParagraphItem data={mockData} settings={mockSettings} selectThis={mockSelect} deleteThis={mockDelete} editThis={mockEdit} />);
    
    fireEvent.click(screen.getByText('commonUIelements.edit'));
    
    expect(mockEdit).toHaveBeenCalledTimes(1);
  });
});
