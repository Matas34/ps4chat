import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import i18next from 'i18next'; // Import i18next
import EditParagraphQuestion from './editParagraphQuestionPage'; 

// Initialize i18next mock
i18next.init({
  lng: 'en',  // You can choose the language you'd like to use
  resources: {
    en: {
      translation: {
        // Mock your translations here
        'editPages.paragraphs.editParAndQ': 'Edit Paragraph and Question',
        'editPages.paragraphs.qEditingorCreating': 'Edit or Create Question',
        'editPages.paragraphs.resetQuest': 'Reset Question',
        'editPages.paragraphs.questUnavailable': 'Questions unavailable',
      },
    },
  },
});

jest.mock('../../.components/.MainComponentsExport', () => ({
  CreateEditParagraph: jest.fn(() => <div>Create/Edit Paragraph</div>),
  CreateEditQuestion: jest.fn(() => <div>Create/Edit Question</div>),
  QuestionList: jest.fn(() => <div>Question List</div>),
  ReturnToArticlesButton: jest.fn(() => <div>Return to Articles</div>),
}));

describe('EditParagraphQuestion Component', () => {
  

  test('disables reset question button when no questionId is set', () => {
    render(
      <MemoryRouter>
        <EditParagraphQuestion />
      </MemoryRouter>
    );

    expect(screen.getByText('editPages.paragraphs.resetQuest')).toBeDisabled();
  });

 

  test('renders appropriate message when no paragraphId is provided', async () => {
    render(
      <MemoryRouter>
        <EditParagraphQuestion />
      </MemoryRouter>
    );
    expect(screen.getByText('editPages.paragraphs.questUnavailable')).toBeInTheDocument();
  });
});