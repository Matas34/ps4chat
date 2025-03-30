import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArticleHomePage from './articleManagementPage';  
import { useNavigate } from 'react-router-dom';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
      t: (key) => key,  
    }),
  }));
  
  jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),  
  }));

describe('ArticleHomePage Component', () => {
  let navigateMock;

  beforeEach(() => {
    navigateMock = useNavigate(); 
  });

  test('renders the ArticleHomePage when loggedInUser is provided', () => {
    const loggedInUser = { username: 'testuser' }; 
    render(<ArticleHomePage loggedInUser={loggedInUser} />);

    expect(screen.getByText('articleManagment.articleHomePage')).toBeInTheDocument();
  });

  test('renders the ArticleHomePage when loggedInUser is null', () => {
    render(<ArticleHomePage loggedInUser={null} />);

    expect(screen.getByText('articleManagment.articleList')).toBeInTheDocument();
    
    expect(screen.queryByText('articleManagment.createArticle')).not.toBeInTheDocument();
    expect(screen.queryByText('articleManagment.createParagraph')).not.toBeInTheDocument();
    expect(screen.queryByText('articleManagment.createQuestion')).not.toBeInTheDocument();
  });

  test('settings are updated based on loggedInUser', () => {
    const loggedInUser = { username: 'testuser' }; 
    const { rerender } = render(<ArticleHomePage loggedInUser={loggedInUser} />);

    expect(screen.getByText('articleManagment.articleHomePage')).toBeInTheDocument();
    expect(screen.getByText('articleManagment.userArticles')).toBeInTheDocument();
    expect(screen.getByText('articleManagment.articleList')).toBeInTheDocument();

    rerender(<ArticleHomePage loggedInUser={null} />);

    expect(screen.queryByText('articleManagment.createArticle')).not.toBeInTheDocument();
    expect(screen.queryByText('articleManagment.createParagraph')).not.toBeInTheDocument();
    expect(screen.queryByText('articleManagment.createQuestion')).not.toBeInTheDocument();
  });
});

describe('ArticleHomePage component', () => {
    let navigateMock;

    beforeEach(() => {
      navigateMock = jest.fn(); 
      useNavigate.mockReturnValue(navigateMock); 
    });

  test('should navigate to /create-article when the "create article" button is clicked', () => {
    const loggedInUser = { username: 'testuser' }; 
    render(<ArticleHomePage loggedInUser={loggedInUser} />);

    const createArticleButton = screen.getByText('articleManagment.articleList');
    fireEvent.click(createArticleButton);

  });

  test('should navigate to /create-question when the "create question" button is clicked', () => {
    const loggedInUser = { username: 'testuser' };
    render(<ArticleHomePage loggedInUser={loggedInUser} />);

    const createQuestionButton = screen.getByText('articleManagment.userArticles');
    fireEvent.click(createQuestionButton);

    expect(navigateMock).toHaveBeenCalled();
  });
  });