import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

import React from 'react';
import ArticleHomePage from '../../pages/Articles/articleManagementPage';
import { MemoryRouter } from 'react-router-dom';
import { articlesMockDataFilled } from '../.mocks/mockConstants';

// Mock react-i18next
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

jest.mock('../../.components/.common-components/ErrorPopup', () => ({ showErrorModal, errorMessage, onClose }) => (
    showErrorModal ? <div>{errorMessage}</div> : null
));

afterEach(() => {
    jest.clearAllMocks();
});

describe('articleManagementPage.js tests', () => {
    const setup = (loggedInUser = null) => {
        render(
            <MemoryRouter>
                <ArticleHomePage loggedInUser={loggedInUser} />
            </MemoryRouter>
        );
    };

    /**
     * Check if there is create article, paragraph and question buttons
     * 
     */
    test('should render articleManagementPage when user is logged in', async () => {
        const mockUser = { username: 'testUser' }; // Mock user object
        setup(mockUser); // Pass loggedInUser as prop
        await waitFor(() => {
            expect(screen.getByText('articleManagment.articleHomePage')).toBeInTheDocument();
            expect(screen.getByText('articleManagment.userArticles')).toBeInTheDocument();
            expect(screen.getByText('articleManagment.articleList')).toBeInTheDocument();
        });
    });

    /**
     * Check if create buttons are not displayed when no user is logged in
     */
    test('should not render create buttons when user is not logged in', async () => {
        setup(null); // No logged in user
        await waitFor(() => {
            expect(screen.queryByText('articleManagment.createArticle')).not.toBeInTheDocument();
            expect(screen.queryByText('articleManagment.createParagraph')).not.toBeInTheDocument();
            expect(screen.queryByText('articleManagment.createQuestion')).not.toBeInTheDocument();
        });
    });

    /**
     * Check if there is at least two articles
     */
    /*
    test('should contain atleast two articles', async () => {
        setup();
        await waitFor(() => {
            expect(screen.getByText(articlesMockDataFilled.articles[0].title)).toBeInTheDocument();
            expect(screen.getByText(articlesMockDataFilled.articles[1].title)).toBeInTheDocument();
        });
    });
    */
});
