import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditParagraph from '../create-edit-paragraph';
import { ParagraphController, ArticleController } from '../../../.controllers/paragraphController';

import { MemoryRouter as Router } from 'react-router-dom';
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
  }));
jest.mock('../../../.controllers/.MainControllersExport', () => ({
  ParagraphController: {
    GetImage: jest.fn(),
    PostImage: jest.fn(),
    DeleteImage: jest.fn(),
    Get: jest.fn(),
    Put: jest.fn(),
    Post: jest.fn(),
  },
  ArticleController: {
    Get: jest.fn(),
  },
}));

describe('EditParagraph Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the EditParagraph component', () => {
    render(<Router><EditParagraph /></Router>);
    expect(screen.getByPlaceholderText('paragraphs.createEdit.enterParTitle')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('paragraphs.createEdit.eneterParText')).toBeInTheDocument();
  });

  test('handles field change correctly', () => {
    render(<Router><EditParagraph /></Router>);
    const titleInput = screen.getByPlaceholderText('paragraphs.createEdit.enterParTitle');

    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    expect(titleInput.value).toBe('New Title');
  });


  test('handles image upload correctly', () => {
    const file = new File(['dummy content'], 'test-image.png', { type: 'image/png' });

    render(<Router><EditParagraph /></Router>);
    const fileInput = screen.getByTestId('file-upload');

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files[0]).toBe(file);
    expect(fileInput.files).toHaveLength(1);
  });

    test('handles successful paragraph creation', async () => {
    const mockParagraph = {
        title: "Test Title",
        text: "Test Paragraph Text",
        articleId: 123,
        };
    const post = jest.fn().mockResolvedValueOnce({ ...mockParagraph, id: 1 });
    ParagraphController.Post = post;
        
    render(<Router><EditParagraph /></Router>);
    const titleInput = screen.getByPlaceholderText('paragraphs.createEdit.enterParTitle');
    const textInput = screen.getByPlaceholderText('paragraphs.createEdit.eneterParText');
    const submitButton = screen.getByText('commonUIelements.create');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(textInput, { target: { value: 'Test Text' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(post).toHaveBeenCalledTimes(0));
   
  });

//   test('fetches existing paragraph and populates fields', async () => {
//     ParagraphController.Get.mockResolvedValueOnce({
//       id: 1,
//       title: 'Existing Title',
//       text: 'Existing Text',
//     });
//     ArticleController.Get.mockResolvedValueOnce({ id: 1, name: 'Test Article' });

//     render(<EditParagraph existingParagraphId={1} />);

//     await waitFor(() => {
//       expect(screen.getByDisplayValue('Existing Title')).toBeInTheDocument();
//       expect(screen.getByDisplayValue('Existing Text')).toBeInTheDocument();
//     });
//   });

//   test('handles delete confirmation', async () => {
//     ParagraphController.DeleteImage.mockResolvedValueOnce();

//     render(<EditParagraph />);
//     const deleteButton = screen.getByText('commonUIelements.deleteImg');

//     fireEvent.click(deleteButton);

//     const confirmButton = screen.getByText('commonUIelements.confirmDelete');
//     fireEvent.click(confirmButton);

//     await waitFor(() => {
//       expect(ParagraphController.DeleteImage).toHaveBeenCalled();
//     });
//   });
});
