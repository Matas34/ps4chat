import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateCategory from './createCategoryPage';
import { useTranslation } from 'react-i18next';
import { ReturnToCategoriesButton, CreateEditCategory } from '../../.components/.MainComponentsExport';
import { BrowserRouter as Router } from 'react-router-dom'; 
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, 
  }),
}));

jest.mock('../../.components/.MainComponentsExport', () => ({
  ReturnToCategoriesButton: jest.fn(() => <button>Return to Categories</button>),
  CreateEditCategory: jest.fn(() => <form>Category Form</form>),
}));

describe('CreateCategory Component', () => {
  

  test('renders the category creation heading', () => {
    render(
      <Router>
        <CreateCategory />
      </Router>
    );
    expect(screen.getByText('categories.createCategory')).toBeInTheDocument();
  });

});