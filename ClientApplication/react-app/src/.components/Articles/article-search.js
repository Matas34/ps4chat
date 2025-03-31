import { Form, Modal, Button } from 'react-bootstrap';
import { React, useState } from 'react';
import { handleSelection } from '../../.helpers/MainHelpers';
import { ArticleController } from "../../.controllers/.MainControllersExport";
import { ValidationPatternConstants } from '../../.constants/MainConstants';
import ErrorPopup from '../.common-components/ErrorPopup';

import { useTranslation } from 'react-i18next'; 

const ArticleSearch = ({ onArticleSelected, articleFromOutside, userId}) => {

    const { t } = useTranslation();

    const [options, setOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal
    const [searchValue, setSearchValue] = useState("");

    // Function to fetch articles based on the user input
    const handleFieldChange = async (event) => {
        const { value } = event.target;
        setSearchValue(value);
        if (value !== "") {
            try {
                let articlePage = await ArticleController.Search(value, userId);
                if (articlePage.articles.length > 0) {
                    const options = articlePage.articles.map((article) => (
                        <option key={article.id} value={article.title}></option>
                    ));
                    setOptions(options);
                } else {
                    setOptions([]); // Clear options if input is empty
                }
            } catch (error) {
                setErrorMessage(error.message); // Set error message
                setShowErrorModal(true); // Show modal
            }
        }
    };

    // Function to handle user selecting an article from the list
    const handleArticleSelect = (event) => {
        handleSelection(options, event, onArticleSelected);
    };

     // Function to close the error modal
     const closeErrorModal = () => {
        setShowErrorModal(false);
    };

    return (
        <>
            <Form noValidate>
                <Form.Group controlId="searchBar" className="input">
                    <Form.Label>{t('articles.search.searchArticles')}</Form.Label>
                    <Form.Control
                        value={articleFromOutside && articleFromOutside.title || searchValue}
                        list="articles"
                        name="articleSearch"
                        required
                        type="text"
                        className="form-control darkInput"
                        placeholder={t('articles.search.enterArticleTitle')}
                        onChange={handleFieldChange} // Update the options list
                        onInput={handleArticleSelect} // Handle article selection
                        autoComplete="off"
                        patter={ValidationPatternConstants.TitlePattern.source}
                    />
                    <datalist id="articles">
                        {options}
                    </datalist>
                    <Form.Control.Feedback type="invalid">
                        {t('articles.search.plsSelectArticle')}{'.'}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form>

            {/* Error Popup */}
            <ErrorPopup 
                showErrorModal={showErrorModal} 
                errorMessage={errorMessage} 
                onClose={closeErrorModal} 
            />
        </>
    );
};

export default ArticleSearch;
