import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Exercise from './exercise';
import * as ArticleController from '../../.controllers/.MainControllersExport';
import * as ParagraphController from '../../.controllers/.MainControllersExport';
import * as QuestionController from '../../.controllers/.MainControllersExport';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useSearchParams: () => [new URLSearchParams({ articleId: '1' })],
}));

jest.mock('../../.controllers/.MainControllersExport');

describe('Exercise Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading spinner initially', () => {
    render(
      <MemoryRouter>
        <Exercise />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument();
  });

  
});