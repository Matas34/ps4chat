import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditQuestions from '../create-edit-questions'

import { MemoryRouter as Router } from 'react-router-dom';
// Mock dependencies
jest.mock('../../../.controllers/.MainControllersExport', () => ({
  QuestionController: {
    GetImage: jest.fn(),
    PostImage: jest.fn(),
    DeleteImage: jest.fn(),
    Get: jest.fn(),
    Put: jest.fn(),
    Post: jest.fn(),
  },
  ParagraphController: {
    Get: jest.fn(),
  },
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('EditQuestions Component', () => {
  test('renders without crashing', () => {
    render(
    <Router>
      <EditQuestions />
    </Router>);
    expect(screen.getByText('questions.createEdit.addAnswer')).toBeInTheDocument();
  });

  test('renders with existing data', async () => {
    const mockQuestion = {
      id: 1,
      text: 'Sample Question',
      paragraphId: 101,
      answerChoices: ['Answer 1', 'Answer 2'],
      correctAnswerIndex: 0,
      imageFileName: 'sample.png',
    };

    const { QuestionController, ParagraphController } = require('../../../.controllers/.MainControllersExport');
    QuestionController.Get.mockResolvedValueOnce(mockQuestion);
    ParagraphController.Get.mockResolvedValueOnce({ id: 101, text: 'Sample Paragraph' });
    render(
      <Router>
        <EditQuestions existingQuestionId={1} />
      </Router>);

    await waitFor(() => expect(screen.getByText('Sample Question')).toBeInTheDocument());
    expect(screen.getByText('Sample Question')).toBeInTheDocument();
    expect(screen.getByAltText('Uploaded Image')).toBeInTheDocument();
  });

  test('adds a new answer', () => {
    render(
      <Router>
        <EditQuestions />
      </Router>);
    const addAnswerButton = screen.getByText('questions.createEdit.addAnswer');
    fireEvent.click(addAnswerButton);

    expect(screen.getAllByPlaceholderText('questions.answerItem.enterAnswer').length).toBe(1);
  });

  test('deletes an answer', () => {
    render(
      <Router>
        <EditQuestions />
      </Router>);
    const addAnswerButton = screen.getByText('questions.createEdit.addAnswer');
    fireEvent.click(addAnswerButton);

    const deleteButton = screen.getByText('questions.answerItem.delete');
    fireEvent.click(deleteButton);

    expect(screen.queryByPlaceholderText('Enter answer text')).not.toBeInTheDocument();
  });

//   test('handles file upload', async () => {
//     render(<EditQuestions />);

//     const fileInput = screen.getAllByTestId('Upload Image');
//     const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

//     fireEvent.change(fileInput, { target: { files: [file] } });

//     await waitFor(() =>
//       expect(screen.getByAltText('Uploaded Image')).toHaveAttribute('src', expect.stringContaining('data:image/png')),
//     );
//   });

  test('validates form submission', async () => {
    render(
      <Router>
        <EditQuestions />
      </Router>);
    const submitButton = screen.getByText('commonUIelements.create');

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByText('Error')).toBeInTheDocument(),
    );
  });

  test('submits a valid form', async () => {
    const mockPost = jest.fn().mockResolvedValueOnce({ id: 1, text: 'New Question' });
    const { QuestionController } = require('../../../.controllers/.MainControllersExport');
    QuestionController.Post = mockPost;

    render(
      <Router>
        <EditQuestions />
      </Router>);

    fireEvent.change(screen.getByPlaceholderText('paragraphs.search.enterParTitle'), {
        target: { value: 'Paragraph title' },
      });
  
      
    fireEvent.change(screen.getByPlaceholderText('questions.createEdit.eneterQuestionText'), {
      target: { value: 'New Question' },
    });

    fireEvent.change(screen.getByPlaceholderText('questions.createEdit.enterParagraphID'), {
      target: { value: '123' },
    });
   
    fireEvent.click(screen.getByText('questions.createEdit.addAnswer'));

    await waitFor(() =>
        expect(screen.getByPlaceholderText('questions.answerItem.enterAnswer')).toBeInTheDocument(),
      );
      
    fireEvent.change(screen.getByPlaceholderText('questions.answerItem.enterAnswer'), {
        target: { value: 'answer' },
    });
    fireEvent.click(screen.getByText('questions.answerItem.correct'));
    
    fireEvent.click(screen.getByText('questions.createEdit.addAnswer'));

    await waitFor(() =>
        expect(screen.getAllByPlaceholderText('questions.answerItem.enterAnswer').length === 2),
      );
      
    fireEvent.change(screen.getAllByPlaceholderText('questions.answerItem.enterAnswer')[1], {
        target: { value: 'not an answer' },
    });
      
    fireEvent.click(screen.getByText('commonUIelements.create'));
      
    await waitFor(() => expect(mockPost).toHaveBeenCalled());
    expect(mockPost).toHaveBeenCalledWith(
      expect.objectContaining({"_answerChoices": ["answer", "not an answer"], "_correctAnswerIndex": 0, "_id": null, "_imageFileName": null, "_paragraphId": "123", "_text": "New Question"}),
    );
  });

  test('displays error modal on no input', async () => {
    const mockPost = jest.fn().mockRejectedValueOnce(new Error('Submission failed'));
    const { QuestionController } = require('../../../.controllers/.MainControllersExport');
    QuestionController.Post = mockPost;

    render(
      <Router>
        <EditQuestions />
      </Router>);

    fireEvent.click(screen.getByText('commonUIelements.create'));

    await waitFor(() => expect(screen.getByText('Error')).toBeInTheDocument());
  });
});
