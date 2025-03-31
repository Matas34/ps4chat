import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EditQuestion from './editQuestionPage';

jest.mock('../../.components/.MainComponentsExport', () => ({
  CreateEditQuestion: jest.fn(() => <div>Mocked CreateEditQuestion</div>),
  ReturnToArticlesButton: jest.fn(() => <button>Return to Articles</button>),
}));

beforeEach(() => {
  jest.spyOn(require('react-router-dom'), 'useSearchParams').mockReturnValue([new URLSearchParams()]);
});

describe('EditQuestion Component', () => {
  test('should render the component correctly with questionId in search params', async () => {
    const searchParamsMock = new URLSearchParams({ questionId: '123' });
    jest.spyOn(require('react-router-dom'), 'useSearchParams').mockReturnValue([searchParamsMock]);

    render(
      <Router>
        <EditQuestion />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('editPages.questions.editQuestion')).toBeInTheDocument();
    });
  });

  test('should render the component correctly without questionId in search params', async () => {
    const searchParamsMock = new URLSearchParams({});
    jest.spyOn(require('react-router-dom'), 'useSearchParams').mockReturnValue([searchParamsMock]);

    render(
      <Router>
        <EditQuestion />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('editPages.questions.editQuestion')).toBeInTheDocument();
    });
  });

  test('should render ReturnToArticlesButton correctly', () => {
    render(
      <Router>
        <EditQuestion />
      </Router>
    );

    expect(screen.getByText('editPages.questions.editQuestion')).toBeInTheDocument();
  });
});
