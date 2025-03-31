import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import '../../styles/errorPopup.css';
const ErrorPopup = ({ showErrorModal, errorMessage, onClose }) => {
    return (
        <Modal show={showErrorModal} onHide={onClose} centered>
            <div className='error-popup'>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
};

export default ErrorPopup;
