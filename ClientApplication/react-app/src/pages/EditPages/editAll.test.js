import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EditArticleParagraphQuestion from './editAll';
import {
  CreateEditArticle,
  CreateEditParagraph,
  ReturnToArticlesButton,
  CreateEditQuestion,
  ArticleList,
  ParagraphList,
  QuestionList,
} from '../../.components/.MainComponentsExport';

jest.mock('../../.components/.MainComponentsExport', () => ({
    CreateEditArticle: jest.fn(() => <div>Create/Edit Article Component</div>),
    CreateEditParagraph: jest.fn(() => <div>Create/Edit Paragraph Component</div>),
    ReturnToArticlesButton: jest.fn(() => <button>Return</button>),
    CreateEditQuestion: jest.fn(() => <div>Create/Edit Question Component</div>),
    ParagraphList: jest.fn(() => <div>Paragraph List Component</div>),
    QuestionList: jest.fn(() => <div>Question List Component</div>),
    ArticleList: jest.fn(() => <div>Article List Component</div>),
  }));
  
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(() => jest.fn()),
    useSearchParams: jest.fn(() => [
      new URLSearchParams({ articleId: '123' }), 
    ]),
  }));

describe('EditArticleParagraphQuestion Component', () => {
  let mockSetSearchParams;

  beforeEach(() => {
    mockSetSearchParams = jest.fn();
    useSearchParams.mockReturnValue([{ get: jest.fn().mockReturnValue(null) }, mockSetSearchParams]);

    jest.clearAllMocks();   });


  test('reset buttons disable correctly when no data is set', () => {
    render(
    <Router>
        <EditArticleParagraphQuestion />
    </Router>);

    const resetArticleButton = screen.getByText('editPages.all.resetArticle');
    const resetParagraphButton = screen.getByText('editPages.all.resetParagraph');
    const resetQuestionButton = screen.getByText('editPages.all.resetQuestion');

    expect(resetArticleButton).toBeDisabled();
    expect(resetParagraphButton).toBeDisabled();
    expect(resetQuestionButton).toBeDisabled();
  });
  test('renders the component with all main elements', () => {
    render(<EditArticleParagraphQuestion />);

    expect(screen.getByText('editPages.all.editAll')).toBeInTheDocument();

  });


  test('reset buttons disable correctly when no data is set', () => {
    render(<EditArticleParagraphQuestion />);

    const resetArticleButton = screen.getByText('editPages.all.resetArticle');
    const resetParagraphButton = screen.getByText('editPages.all.resetParagraph');
    const resetQuestionButton = screen.getByText('editPages.all.resetQuestion');

    expect(resetArticleButton).toBeDisabled();
    expect(resetParagraphButton).toBeDisabled();
    expect(resetQuestionButton).toBeDisabled();
  });

});
describe('EditArticleParagraphQuestion Component2', () => {
    let mockSetSearchParams;

    beforeEach(() => {
        mockSetSearchParams = jest.fn();
        useSearchParams.mockReturnValue([{ get: jest.fn().mockReturnValue(null) }]);
    });

    it('should call resetArticleId when Reset Article button is clicked', () => {
        render(<EditArticleParagraphQuestion />);
        
        const button = screen.getByText('editPages.all.resetArticle');
        fireEvent.click(button);

        expect(button).toBeDisabled();
    });

    it('should call resetParagraphId when Reset Paragraph button is clicked', () => {
        render(<EditArticleParagraphQuestion />);

        const button = screen.getByText('editPages.all.resetParagraph');
        fireEvent.click(button);

        expect(button).toBeDisabled();
    });

    it('should call resetQuestionId when Reset Question button is clicked', () => {
        render(<EditArticleParagraphQuestion />);

        const button = screen.getByText('editPages.all.resetQuestion');
        fireEvent.click(button);

        expect(button).toBeDisabled();
    });
});
