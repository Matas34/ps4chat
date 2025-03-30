import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ArticleList from '../Listing/article-list';
import '@testing-library/jest-dom';
import { ArticleController } from '../../../.controllers/.MainControllersExport';
import ErrorPopup from '../../.common-components/ErrorPopup';

jest.mock('../../../.controllers/.MainControllersExport', () => ({
  ArticleController: {
    GetPage: jest.fn(),
  },
}));

jest.mock('../../.common-components/ErrorPopup', () => (props) => {
  return props.showErrorModal ? (
    <div data-testid="error-popup">
      <p>{props.errorMessage}</p>
      <button onClick={props.onClose}>Close</button>
    </div>
  ) : null;
});

jest.mock('../Listing/article-item', () => (props) => {
  return (
    <div data-testid="article-item">
      <h2>{props.data.title}</h2>
      <button onClick={props.selectThis}>Select</button>
      <button onClick={props.editThis}>Edit</button>
      <button onClick={props.playThis}>Play</button>
    </div>
  );
});

jest.mock('react-paginate', () => (props) => {
  const { pageCount, onPageChange } = props;
  const handleClick = () => {
    onPageChange({ selected: 1 });
  };
  return (
    <div data-testid="react-paginate">
      <button onClick={handleClick}>Go to page 2</button>
      <span>Page Count: {pageCount}</span>
    </div>
  );
});

describe('ArticleList Component', () => {
  const mockArticlesPage1 = {
    articles: [
      { id: 1, title: 'Article 1', categoryTitle: 'Tech' },
      { id: 2, title: 'Article 2', categoryTitle: 'Health' },
    ],
    count: 4,
  };

  const mockArticlesPage2 = {
    articles: [
      { id: 3, title: 'Article 3', categoryTitle: 'Science' },
      { id: 4, title: 'Article 4', categoryTitle: 'Business' },
    ],
    count: 4,
  };

  const settings = {
    showSelectButton: true,
    showDeleteButton: true,
    showEditButton: true,
    showPlayButton: true,
  };

  const mockCallbacks = {
    getSelected: jest.fn(),
    getEditing: jest.fn(),
    getPlay: jest.fn(),
  };

  const setup = (page = 0, update = false) => {
    return render(
      <ArticleList
        settings={settings}
        getSelected={mockCallbacks.getSelected}
        update={update}
        getEditing={mockCallbacks.getEditing}
        getPlay={mockCallbacks.getPlay}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.REACT_APP_PAGING_SIZE = '2';
  });


  test('handles pagination correctly', async () => {
    ArticleController.GetPage.mockResolvedValueOnce(mockArticlesPage1);
    ArticleController.GetPage.mockResolvedValueOnce(mockArticlesPage2);

    setup();

    await waitFor(() => {
      expect(ArticleController.GetPage).toHaveBeenCalledWith(1, undefined);
    });

    const paginateButton = screen.getByText('Go to page 2');
    fireEvent.click(paginateButton);

    await waitFor(() => {
      expect(ArticleController.GetPage).toHaveBeenCalledWith(2, undefined);
    });
  });

  test('re-fetches articles when update prop changes', async () => {
    ArticleController.GetPage.mockResolvedValueOnce(mockArticlesPage1);
    const { rerender } = render(
      <ArticleList
        settings={settings}
        getSelected={mockCallbacks.getSelected}
        update={false}
        getEditing={mockCallbacks.getEditing}
        getPlay={mockCallbacks.getPlay}
      />
    );

    await waitFor(() => {
      expect(ArticleController.GetPage).toHaveBeenCalledWith(1, undefined);
    });

    ArticleController.GetPage.mockResolvedValueOnce(mockArticlesPage2);

    rerender(
      <ArticleList
        settings={settings}
        getSelected={mockCallbacks.getSelected}
        update={true}
        getEditing={mockCallbacks.getEditing}
        getPlay={mockCallbacks.getPlay}
      />
    );

    await waitFor(() => {
      expect(ArticleController.GetPage).toHaveBeenCalledWith(1, undefined);
    });
  });

  test('does not render anything when there are no articles', async () => {
    const emptyArticles = {
      articles: [],
      count: 0,
    };
    ArticleController.GetPage.mockResolvedValueOnce(emptyArticles);

    setup();

    await waitFor(() => {
      expect(ArticleController.GetPage).toHaveBeenCalledWith(1, undefined);
    });

    const articleItems = screen.queryAllByTestId('article-item');
    expect(articleItems).toHaveLength(0);
    expect(screen.queryByTestId('react-paginate')).toBeInTheDocument(); 
  });
});
