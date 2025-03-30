import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateQuestion from './createQuestionPage'; 
import { useNavigate } from 'react-router-dom'; 



jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));


describe('CreateArticle Component', () => {
  let navigateMock;

  beforeEach(() => {
     navigateMock = useNavigate();
    
  });

  test('renders the "createArticle" heading and components', () => {
    render(<CreateQuestion />);

    expect(screen.getByText('articles.returnToArticlesBtn.main')).toBeInTheDocument();

    
  });

});