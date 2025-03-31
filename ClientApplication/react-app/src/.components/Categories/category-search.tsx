import { Form, Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { handleSelection } from '../../.helpers/MainHelpers';
import { CategoryController } from "../../.controllers/.MainControllersExport";
import { ValidationPatternConstants } from '../../.constants/MainConstants';
import ErrorPopup from '../.common-components/ErrorPopup';
import { Category } from '../../.entities/.MainEntitiesExport';
import { useTranslation } from 'react-i18next'; 
import React from 'react';

const CategorySearch = ({ onCategorySelected, categoryFromOutside, userId}) => {

    const { t } = useTranslation();

    const [options, setOptions] = useState<JSX.Element[]>([]);
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal
    const [searchValue, setSearchValue] = useState("");

    const handleFieldChange = async (event) => {
        const { value } = event.target;
        setSearchValue(value);
        if (value !== "") {
            try {
                let categoryPage = await CategoryController.Search(value, userId);
                if (categoryPage.categories && categoryPage.categories.length > 0) {
                    const options = categoryPage.categories.map((category) => (
                        <option key={category.id} value={category.title}></option>
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
    const handleCategorySelect = (event) => {
        handleSelection(options, event, onCategorySelected);
    };

     // Function to close the error modal
     const closeErrorModal = () => {
        setShowErrorModal(false);
    };

    return (
        <>
            <Form noValidate>
                <Form.Group controlId="searchBar" className="input">
                    <Form.Label>{t('categories.search.searchCategories')}</Form.Label>
                    <Form.Control
                        value={categoryFromOutside && categoryFromOutside.title || searchValue}
                        list="categories"
                        name="categorySearch"
                        required
                        type="text"
                        className="form-control darkInput"
                        placeholder={t('categories.search.enterCategoryTitle')}
                        onChange={handleFieldChange} // Update the options list
                        onInput={handleCategorySelect} // Handle article selection
                        autoComplete="off"
                    />
                    <datalist id="categories">
                        {options}
                    </datalist>
                    <Form.Control.Feedback type="invalid">
                        {t('categories.search.plsSelectCategory')}{'.'}
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

export default CategorySearch;
