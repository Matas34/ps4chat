import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditCategory from '../create-edit-category';
import { CategoryController } from '../../../.controllers/categoryController.ts';
import { Category } from '../../../.entities/.MainEntitiesExport.ts';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
// Mock translations
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}));

// Mock CategoryController
jest.mock('../../../.controllers/categoryController.ts', () => ({
  CategoryController: {
    GetImage: jest.fn(),
    PostImage: jest.fn(),
    DeleteImage: jest.fn(),
    Put: jest.fn(),
    Post: jest.fn()
  }
}));

const fillForm = async ({ title = 'Test Category', text = 'Test content' } = {}) => {
  const titleInput = screen.getByPlaceholderText('categories.enterCategoryName');
  const textInput = screen.getByPlaceholderText('categories.enterCategoryContent');

  fireEvent.change(titleInput, { target: { value: title } });
  fireEvent.change(textInput, { target: { value: text } });
};

describe('EditCategory', () => {
  beforeEach(() => {
    // Reset the mocks before each test
    const { CategoryController } = require('../../../.controllers/.MainControllersExport');
    CategoryController.GetImage.mockResolvedValue('imageURL');
    CategoryController.PostImage.mockResolvedValue();
    CategoryController.DeleteImage.mockResolvedValue();
    CategoryController.Put.mockResolvedValue({ id: 1, title: 'Updated Category' });
    CategoryController.Post.mockResolvedValue({ id: 1, title: 'New Category' });
  });

  test('should render the category form', () => {
    render(<EditCategory />);

    // Check for form elements
    expect(screen.getByPlaceholderText(/categories.enterCategoryName/i)).toBeInTheDocument();
  });

  test('should update the category image when a file is selected', async () => {
    render(<EditCategory />);
    
    const fileInput = screen.getByPlaceholderText(/categories.enterCategoryName/i); // Adjust based on the form input name
    const file = new File(['(⌐□_□)'], 'test-image.jpg', { type: 'image/jpeg' });

    fireEvent.change(fileInput, { target: { files: [file] } });
    await waitFor(() => expect(screen.getByAltText('Uploaded Image')).toHaveAttribute('src'));

    expect(screen.getByAltText('Uploaded Image')).toHaveAttribute('src');
  });


  test('should display success message on successful category update', async () => {
    render(<EditCategory />);

    const submitButton = screen.getByRole('button', { name: /create/i });
    userEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText('Created category successfully.')).toBeInTheDocument());
  });

  // test('should delete category image when delete button is clicked', async () => {
  //   render(<EditCategory />);

  //   const deleteButton = screen.getByRole('button', { name: /deleteImg/i });
  //   userEvent.click(deleteButton);

  //   await waitFor(() => expect(CategoryController.DeleteImage).toHaveBeenCalled());
  //   expect(screen.getByAltText('Uploaded Image')).toHaveAttribute('src', '/path/to/no-image.png');
  // });

  test('should call create category API when new category is submitted', async () => {
    render(<EditCategory />);

    const submitButton = screen.getByRole('button', { name: /create/i });
    userEvent.click(submitButton);

    await waitFor(() => expect(CategoryController.Post).toHaveBeenCalled());
  });

  // test('should call update category API when existing category is submitted', async () => {
  //   render(<EditCategory />);

  //   // Mock category id for updating
  //   const { CategoryController } = require('../../../.controllers/.MainControllersExport');
    

  //   const submitButton = screen.getByRole('button', { name: /update/i });
  //   userEvent.click(submitButton);

  //   await waitFor(() => {
  
  //     expect(CategoryController.Put).toHaveBeenCalled()});
  //   });

 

});

describe('EditCategory Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    CategoryController.GetImage.mockResolvedValue('mockImageURL');
    CategoryController.PostImage.mockResolvedValue(true);
    CategoryController.DeleteImage.mockResolvedValue(true);
    CategoryController.Put.mockResolvedValue(new Category({ id: 1, title: 'Updated', text: 'Updated content', imageFileName: 'hasImage' }));
    CategoryController.Post.mockResolvedValue(new Category({ id: 2, title: 'Created', text: 'Created content', imageFileName: 'hasImage' }));
  });

  it('renders form fields and submit button', () => {
    render(<EditCategory />);
    expect(screen.getByPlaceholderText('categories.enterCategoryName')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('categories.enterCategoryContent')).toBeInTheDocument();

    expect(screen.getByText('commonUIelements.create')).toBeInTheDocument();
  });

  it('displays validation errors if form is submitted with invalid data', async () => {
    render(<EditCategory />);

    const submitButton = screen.getByText('commonUIelements.create');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('categories.plsEnterCategoryName.')).toBeInTheDocument();
      expect(screen.getByText('categories.plsEnterCategoryContent.')).toBeInTheDocument();
    });
  });

  it('submits form and shows success modal upon creating a category', async () => {
    render(<EditCategory />);
    await fillForm();

    const submitButton = screen.getByText('commonUIelements.create');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(CategoryController.Post).toHaveBeenCalled();
      expect(screen.getByText('Created category successfully.')).toBeInTheDocument();
    });
  });

  it('shows error modal if submission fails', async () => {
    CategoryController.Post.mockRejectedValueOnce(new Error('Create error'));
    render(<EditCategory />);
    await fillForm();
    
    const submitButton = screen.getByText('commonUIelements.create');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Create error')).toBeInTheDocument();
    });
  });
  
});

describe('EditCategory Component Popups', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    CategoryController.GetImage.mockResolvedValue('mockImageURL');
    CategoryController.PostImage.mockResolvedValue(true);
    CategoryController.DeleteImage.mockResolvedValue(true);
    CategoryController.Put.mockResolvedValue(
      new Category({ id: 1, title: 'Updated', text: 'Updated content', imageFileName: 'hasImage' })
    );
    CategoryController.Post.mockResolvedValue(
      new Category({ id: 2, title: 'Created', text: 'Created content', imageFileName: 'hasImage' })
    );
  });
  // test('delete image', () => {

  //   render(<EditCategory />);
  //   await fillForm();
    


  // });
  it('displays and closes success popup on successful creation', async () => {
    render(<EditCategory />);
    await fillForm();

    const submitButton = screen.getByText('commonUIelements.create');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Created category successfully.')).toBeInTheDocument();
    });

  });

  it('displays and closes error popup on failed creation', async () => {
    CategoryController.Post.mockRejectedValueOnce(new Error('Create error'));
    render(<EditCategory />);
    await fillForm();

    const submitButton = screen.getByText('commonUIelements.create');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Create error')).toBeInTheDocument();
    });

  });

});
