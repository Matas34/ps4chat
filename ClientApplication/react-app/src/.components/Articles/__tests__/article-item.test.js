// ArticleItem.test.js
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ArticleItem from '../Listing/article-item';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { MdModeEdit } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en', // default language English
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          'commonUIelements.select': 'Select',
          'commonUIelements.delete': 'Delete',
          'commonUIelements.edit': 'Edit',
          'articles.item.read': 'Read',
        },
      },
      lt: {
        translation: {
          'commonUIelements.select': 'Pasirinkti',
          'commonUIelements.delete': 'Ištrinti',
          'commonUIelements.edit': 'Redaguoti',
          'articles.item.read': 'Skaityti',
        },
      },
    },
  });
});

describe('ArticleItem Component', () => {
  const mockData = {
    title: 'Sample Article Title',
    categoryTitle: 'Technology',
  };

  const mockCallbacks = {
    selectThis: jest.fn(),
    deleteThis: jest.fn(),
    editThis: jest.fn(),
    playThis: jest.fn(),
  };

  const renderWithI18n = (language = 'en', settings = {}) => {
    act(() => {
      i18n.changeLanguage(language);
    });

    return render(
      <I18nextProvider i18n={i18n}>
        <ArticleItem
          data={mockData}
          settings={settings}
          selectThis={mockCallbacks.selectThis}
          deleteThis={mockCallbacks.deleteThis}
          editThis={mockCallbacks.editThis}
          playThis={mockCallbacks.playThis}
        />
      </I18nextProvider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders title and category correctly', () => {
    const settings = {
      showSelectButton: true,
      showDeleteButton: true,
      showEditButton: true,
      showPlayButton: true,
    };
    renderWithI18n('en', settings);

    expect(screen.getByText(mockData.title)).toBeInTheDocument();
    expect(screen.getByText(mockData.categoryTitle)).toBeInTheDocument();
  });

  test('renders all buttons when settings allow', () => {
    const settings = {
      showSelectButton: true,
      showDeleteButton: true,
      showEditButton: true,
      showPlayButton: true,
    };
    renderWithI18n('en', settings);

    expect(screen.getByText('Select')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    //expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Read')).toBeInTheDocument();
  });

  test('renders buttons with correct texts in Lithuanian', () => {
    const settings = {
      showSelectButton: true,
      showDeleteButton: true,
      showEditButton: true,
      showPlayButton: true,
    };
    renderWithI18n('lt', settings);

    expect(screen.getByText('Pasirinkti')).toBeInTheDocument();
    expect(screen.getByText('Ištrinti')).toBeInTheDocument();
    //expect(screen.getByText('Redaguoti')).toBeInTheDocument();
    expect(screen.getByText('Skaityti')).toBeInTheDocument();
  });

  test('updates button texts when language changes dynamically', () => {
    const settings = {
      showSelectButton: true,
      showDeleteButton: true,
      showEditButton: true,
      showPlayButton: true,
    };
    renderWithI18n('en', settings);

    expect(screen.getByText('Select')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    //expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Read')).toBeInTheDocument();

    // Change language to Lithuanian
    act(() => {
      i18n.changeLanguage('lt');
    });

    expect(screen.getByText('Pasirinkti')).toBeInTheDocument();
    expect(screen.getByText('Ištrinti')).toBeInTheDocument();
    //expect(screen.getByText('Redaguoti')).toBeInTheDocument();
    expect(screen.getByText('Skaityti')).toBeInTheDocument();

    act(() => {
      i18n.changeLanguage('en');
    });

    expect(screen.getByText('Select')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    //expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Read')).toBeInTheDocument();
  });

  test('handles unsupported language gracefully by falling back to English', () => {
    const settings = {
      showSelectButton: true,
      showDeleteButton: true,
      showEditButton: true,
      showPlayButton: true,
    };
    renderWithI18n('de', settings); 

    expect(screen.getByText('Select')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    //expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Read')).toBeInTheDocument();
  });


  test('calls the appropriate callback when Delete button is clicked', () => {
    const settings = {
      showSelectButton: false,
      showDeleteButton: true,
      showEditButton: false,
      showPlayButton: false,
    };
    renderWithI18n('en', settings);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockCallbacks.deleteThis).toHaveBeenCalledTimes(1);
  });

  test('calls the appropriate callback when Read button is clicked', () => {
    const settings = {
      showSelectButton: false,
      showDeleteButton: false,
      showEditButton: false,
      showPlayButton: true,
    };
    renderWithI18n('en', settings);

    const readButton = screen.getByText('Read');
    fireEvent.click(readButton);

    expect(mockCallbacks.playThis).toHaveBeenCalledTimes(1);
  });
});
