import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import '../../styles/createPopup.css';
const SuccessPopup = ({ showCreateModal, message, onClose }) => {
    return (
        <Modal show={showCreateModal} onHide={onClose} centered>
            <div className='success-popup'>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
}

export default SuccessPopup;