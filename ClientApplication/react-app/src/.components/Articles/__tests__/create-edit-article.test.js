import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditArticle from '../Creating-Editing/create-edit-article';
import { ArticleController } from '../../../.controllers/.MainControllersExport';
import { useTranslation } from 'react-i18next';
import { MemoryRouter as Router } from 'react-router-dom';


jest.mock('../../../.controllers/.MainControllersExport', () => ({
  ArticleController: {
    Get: jest.fn(),
    Post: jest.fn(),
    Put: jest.fn(),
    GetImage: jest.fn(),
    DeleteImage: jest.fn(),
    PostImage: jest.fn(),
  },
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

test('renders EditArticle component', () => {
  render(
  <Router> 
    <EditArticle />
  </Router>
  );

  expect(screen.getByText(/articles.createEdit.articleTitle/i)).toBeInTheDocument();
  // expect(screen.getByText(/articles.createEdit.articleCategory/i)).toBeInTheDocument();
  expect(screen.getByText(/articles.createEdit.articleAuthor/i)).toBeInTheDocument();
});

test('handles file upload', async () => {
  render(
    <Router> 
      <EditArticle />
    </Router>
    );

  const fileInput = screen.getByTestId('file-input');
  const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

  fireEvent.change(fileInput, { target: { files: [file] } });

  await waitFor(() => {
    expect(screen.getByAltText('Uploaded Image')).toHaveAttribute('src');
  });
});

// test('calls handleSave on form submission', async () => {
//   const mockArticle = { id: 1, title: 'Test Title', categoryTitle: 'Test Category' };
//   ArticleController.Post.mockResolvedValue(mockArticle);

//   render(<EditArticle />);

//   const titleInput = screen.getByPlaceholderText(/enterArticleTitle/i);
//   const categoryInput = screen.getByPlaceholderText(/enterArticleCategory/i);
//   const submitButton = screen.getByText('commonUIelements.create');

//   fireEvent.change(titleInput, { target: { value: 'Test Title' } });
//   fireEvent.change(categoryInput, { target: { value: 'Test Category' } });
//   fireEvent.click(submitButton);

//   await waitFor(() => {
//     expect(ArticleController.Post).toHaveBeenCalledWith(expect.objectContaining({
//       title: 'Test Title',
//       categoryTitle: 'Test Category',
//     }));
//   });
// });

test('displays error message on save failure', async () => {
  ArticleController.Post.mockRejectedValue(new Error('Failed to save article'));

  render(
    <Router> 
      <EditArticle />
    </Router>
    );

  //const submitButton = screen.getByRole('button', { name: /create/i ,type: "submit"});
  const submitButton = screen.getByText('commonUIelements.create');
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/Failed to save article/i)).toBeInTheDocument();
  });
});