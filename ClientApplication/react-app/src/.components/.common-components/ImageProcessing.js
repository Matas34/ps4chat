import { React, useState, useEffect } from 'react';
import { Button, Form, Image } from 'react-bootstrap';

import ErrorPopup from "./ErrorPopup"
import DeletePopup from "./DeletePopup"
import NoImage from '../../no-image.png'

const ImageProccessing = ({ entity, controller, triggerUpdate, triggerGetImage }) => {
    const [imageFileUrl, setImageUrl] = useState(NoImage)
    const [imageFile, setImageFile] = useState(undefined)
    const [updateImageFile, setUpdateImageFile] = useState(false)

    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

    const [myEntity, setEntity] = useState(entity);

    useEffect(() => {
        setEntity(entity);
        getArticleImage(myEntity);
    }, [entity.imageFileName]);

    useEffect(() => {
        updateArticleImage(myEntity);
    }, [triggerUpdate])

    useEffect(() => {
        getArticleImage(myEntity);
    }, [triggerGetImage])

    // save the image, then if user creates or updates the article, do the same for the image
    /**
     * Handle file upload
     */
    const handleFileUpload = (event) => {
        event.preventDefault();
        const file = event.target.files[0];

        if (file) {
            setImageFile(file);
            setUpdateImageFile(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result); // Set the image to the data URL
            };
            reader.readAsDataURL(file); // Read the file as a Data URL
        }
    };

    const getArticleImage = async (entity) => {
        try {
            if (entity.imageFileName) {
                let imageURL = await controller.GetImage(entity.id);
                setImageUrl(imageURL);
                setImageFile(undefined);
                setUpdateImageFile(false);
            }
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }
    }

    const updateArticleImage = async (entity) => {
        try {
            if (imageFile === undefined) {
                return;
            }

            if (entity.imageFileName && imageFile === null) {
                await controller.DeleteImage(entity.id);
                entity.imageFileName = null;
                imageFile === undefined
            } if (entity.imageFileName === null && imageFile) {
                await controller.PostImage(entity.id, imageFile);
                entity.imageFileName = "hasImage";
            } else if (entity.imageFileName && imageFile && updateImageFile) {
                await controller.DeleteImage(entity.id);
                await controller.PostImage(entity.id, imageFile);
                entity.imageFileName = "hasImage";
                imageFile === undefined
                setUpdateImageFile(false);
            }
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }
    }

    // const deleteArticleImage = async () => {
    //     try {
    //         if (imageFile === undefined) {
    //             return;
    //         }
    // }

    // Function to close the error modal
    const closeErrorModal = () => {
        setShowErrorModal(false);
    };

    return (
        <>
            <Form>
                <Form.Group className="d-flex justify-content-center">
                    <Image height="200" src={imageFileUrl} alt="Uploaded Image" />
                </Form.Group>
                <Form.Group className="d-flex justify-content-center">
                    <div>
                        <input
                            className="form-control darkInput"
                            type="file"
                            onChange={handleFileUpload}
                        />
                    </div>
                </Form.Group>
                {entity._imageFileName && (
                    <Button>Delete image</Button>

                )}
            </Form>

            {/* Error Popup */}
            <ErrorPopup
                showErrorModal={showErrorModal}
                errorMessage={errorMessage}
                onClose={closeErrorModal}
            />
        </>
    )

}

export default ImageProccessing;