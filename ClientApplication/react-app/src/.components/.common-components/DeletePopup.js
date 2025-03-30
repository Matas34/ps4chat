import { Modal, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import React from 'react';
import '../../styles/errorPopup.css';
const DeletePopup = ({ showDeleteModal, message, onClose, onDelete }) => {
    return (
        <Modal show={showDeleteModal} onHide={onClose} centered>
            <div className='error-popup'>
                <Modal.Header closeButton>
                    <Modal.Title>Delete?</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Row>
                        <Col>
                            <Button variant="secondary" onClick={onClose}>
                                Cancel
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="danger" onClick={onDelete}>
                                Delete
                            </Button>
                        </Col>
                    </Row>


                </Modal.Footer>
            </div>
        </Modal>
    );
};

export default DeletePopup;
