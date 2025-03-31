import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ArticleSearch from '../article-search';
import { ArticleController } from '../../../.controllers/.MainControllersExport';
import { useTranslation } from 'react-i18next';

jest.mock('../../../.controllers/.MainControllersExport', () => ({
  ArticleController: {
    Search: jest.fn(),
    GetPage: jest.fn()
  },
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));


jest.mock('../../.common-components/ErrorPopup', () => ({ showErrorModal, errorMessage, onClose }) => (
  showErrorModal ? (
    <div role="alert" onClick={onClose}>
      {errorMessage}
    </div>
  ) : null
));

afterEach(() => {
  jest.clearAllMocks();
});

test('renders ArticleSearch component', () => {
  const { getByLabelText } = render(<ArticleSearch />);
  expect(getByLabelText('articles.search.searchArticles')).toBeInTheDocument();
});

test('clears options when no articles are found', async () => {
  ArticleController.Search.mockResolvedValueOnce({ articles: [] });
  const { getByPlaceholderText } = render(<ArticleSearch />);
  const input = getByPlaceholderText('articles.search.enterArticleTitle'); 
  fireEvent.change(input, { target: { value: 'test' } });
  await waitFor(() => {
    const datalist = document.getElementById('articles');
    expect(datalist).toBeInTheDocument();
    expect(datalist.children.length).toBe(0);
  });
});

test('closes error modal when clicked', async () => {
  const mockError = new Error('Network Error');
  ArticleController.Search.mockRejectedValue(mockError);
  render(<ArticleSearch />);
  const input = screen.getByPlaceholderText('articles.search.enterArticleTitle');
  fireEvent.change(input, { target: { value: 'Article' } });
  const errorMessage = await screen.findByRole('alert');
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent('Network Error');
  fireEvent.click(errorMessage);
  await waitFor(() => {
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

test('handles article selection', async () => {
  const mockArticle = { id: 1, title: 'Selected Article' };

  // Mock `ArticleController.Search` to return articles including the mock article
  ArticleController.Search.mockResolvedValueOnce({
    articles: [mockArticle],
  });

  // Render the component
  const { getByPlaceholderText } = render(<ArticleSearch />);
  const input = getByPlaceholderText('articles.search.enterArticleTitle');

  // Simulate typing in the input field
  fireEvent.change(input, { target: { value: 'Selected' } });

  // Wait for the dropdown options to appear
  await waitFor(() => {
    const datalist = document.getElementById('articles'); // Assuming the datalist has the id 'articles'
    expect(datalist).toBeInTheDocument();
    expect(datalist.children.length).toBe(1); // One option should appear
  });

  // Simulate selecting the article
  fireEvent.change(input, { target: { value: mockArticle.title } });

  // Assert that the correct article was selected
  await waitFor(() => {
    expect(input.value).toBe(mockArticle.title); // The input value updates to the selected article title
  });
});

test('updates options based on user input', async () => {
  const mockArticles = {
    articles: [
      { id: 1, title: 'Article One' },
      { id: 2, title: 'Article Two' },
    ],
  };

  ArticleController.Search.mockResolvedValue(mockArticles);

  const { getByPlaceholderText } = render(<ArticleSearch />);
  const input = getByPlaceholderText('articles.search.enterArticleTitle');

  fireEvent.change(input, { target: { value: 'Article' } });

  await waitFor(() => {
    expect(ArticleController.Search).toHaveBeenCalledWith('Article',undefined);
    const datalist = document.getElementById('articles');
    expect(datalist).toBeInTheDocument();
    expect(datalist.children.length).toBe(2);
    expect(datalist.children[0]).toHaveAttribute('value', 'Article One');
    expect(datalist.children[1]).toHaveAttribute('value', 'Article Two');
  });
});

test('displays error modal when search fails', async () => {
  const mockError = new Error('Network Error');

  ArticleController.Search.mockRejectedValue(mockError);

  const { getByPlaceholderText, findByText } = render(<ArticleSearch />);
  const input = getByPlaceholderText('articles.search.enterArticleTitle');

  fireEvent.change(input, { target: { value: 'Article' } });

  const errorMessage = await findByText('Network Error');
  expect(errorMessage).toBeInTheDocument();
});
