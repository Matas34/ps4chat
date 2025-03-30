import { Form } from 'react-bootstrap';
import { React } from 'react';
import { handleSelection } from '../../.helpers/MainHelpers';
import { useState } from 'react';
import { ParagraphController } from "../../.controllers/.MainControllersExport";
import { ValidationPatternConstants } from '../../.constants/MainConstants';
import ErrorPopup from '../.common-components/ErrorPopup';

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

import { useTranslation } from 'react-i18next'; 

const ParagraphSearch = ({ onParagraphSelected, paragraphFromOutside, userId }) => {

    const { t } = useTranslation();

    const [options, setOptions] = useState([]);

    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal
    const [searchValue, setSearchValue] = useState("");

    const handleFieldChange = async (event) => {
        const { value } = event.target;
        if (value !== "") {
            setSearchValue(value);
            try {
                let paragraphPage = await ParagraphController.Search(value, userId);
                if (paragraphPage.paragraphs.length > 0) {
                    const options = paragraphPage.paragraphs.map((paragraph) => (
                        <option key={paragraph.id} value={paragraph.title}></option>
                    ));
                    setOptions(options);

                } else {
                    setOptions([]);
                }
            } catch (error) {
                setErrorMessage(error.message); // Set error message
                setShowErrorModal(true); // Show modal
            }
        };
    };

    const handleParagraphSelect = (event) => {
        handleSelection(options, event, onParagraphSelected);
    };

    // Function to close the error modal
    const closeErrorModal = () => {
        setShowErrorModal(false);
    };

    return (
        <>
            <Form noValidate>
                <Form.Group controlId="searchBar" className="input">
                    <Form.Label>{t('paragraphs.search.searchPar')}</Form.Label>
                    <Form.Control
                        value={paragraphFromOutside && paragraphFromOutside.title || searchValue}
                        list="paragraphs"
                        name="paragraphSearch"
                        required
                        type="text"
                        className="form-control darkInput"
                        placeholder={t('paragraphs.search.enterParTitle')}
                        onChange={handleFieldChange}
                        onInput={handleParagraphSelect}
                        autoComplete="off"
                        patter={ValidationPatternConstants.TitlePattern.source}
                    />
                    <datalist id="paragraphs">
                        {options}
                    </datalist>
                    <Form.Control.Feedback type="invalid">
                        {t('paragraphs.search.plsSelectPar')}{'.'}
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

export default ParagraphSearch;
