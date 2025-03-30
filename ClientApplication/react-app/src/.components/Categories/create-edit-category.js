import { React, useState, useEffect } from 'react';
import { Button, Form, Image, Col, Row } from 'react-bootstrap';
import NoImage from '../../no-image.png'
import { Category } from '../../.entities/.MainEntitiesExport';
import { CategoryController } from '../../.controllers/.MainControllersExport';
import ErrorPopup from '../.common-components/ErrorPopup';
import SuccessPopup from '../.common-components/SuccessPopup';
import DeletePopup from '../.common-components/DeletePopup';
import { useTranslation } from 'react-i18next'; 
import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';

const EditCategory = ({existingCategoryId = undefined}) => {

    useEffect(() => {
        setCategoryFromExisting(existingCategoryId);
    }, [existingCategoryId]);

    const { t } = useTranslation();

    const [category, setCategory] = useState(
        new Category()
    );
    const [validated, setValidated] = useState(false);
    const [update, setUpdate] = useState(false);

    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State to show/hide modal

    const [imageFileUrl, setImageUrl] = useState(NoImage)
    const [imageFile, setImageFile] = useState(undefined)
    const [updateImageFile, setUpdateImageFile] = useState(false)

    const [deleteMessage, setDeleteMessage] = useState(""); // State for success message
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State to show/hide modal
    const [deleteRequest, setDeleteRequest] = useState(null)

    useEffect(() => {
        if (category && category.imageFileName) {
            getCategoryImage();
        }
    }, [category.imageFileName]);

    useEffect(() => {
        updateCategoryImage();
    }, [category.id]);

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

    const getCategoryImage = async () => {
        try {
            if (category.imageFileName) {
                let imageURL = await CategoryController.GetImage(category.id);
                setImageUrl(imageURL);
                setImageFile(undefined);
                setUpdateImageFile(false);
            }
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }
    }

    const updateCategoryImage = async () => {
        try {
            if (category.id === null) {
                return;
            }
            if (category.imageFileName === null && imageFile) {
                await CategoryController.PostImage(category.id, imageFile);
                category.imageFileName = "hasImage";
            } else if (category.imageFileName && imageFile && updateImageFile) {
                await CategoryController.DeleteImage(category.id);
                await CategoryController.PostImage(category.id, imageFile);
                category.imageFileName = "hasImage";
                imageFile === undefined
                setUpdateImageFile(false);
            }
        } catch (err) {
            throw err;
        }
    }

    const deleteCategoryImage = () => {
        if (!category.imageFileName) {
            return;
        }
        setDeleteRequest(1);
        setShowDeleteModal(true);
        setDeleteMessage("Are you sure you want to delete the image?");
    }

    const deleteConfirmed = async () => {
        setShowDeleteModal(false);
        if (deleteRequest === 1){
            try {
                if (category.imageFileName) {
                    await CategoryController.DeleteImage(category.id);
                    category.imageFileName = null;
                    imageFile === undefined
                    setImageUrl(NoImage);
                }
            }
            catch (error) {
                setErrorMessage(error.message); // Set error message
                setShowErrorModal(true); // Show modal
            }

        }
        setDeleteRequest(null)
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteRequest(null)
    }

    const handleSave = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

            try {
                let newCategory;
                if (update) {
                    newCategory = await CategoryController.Put(category);
                    setSuccessMessage("Updated category successfully.");
                    setShowSuccessModal(true);
                    updateCategoryImage();
                } else {
                    newCategory = await CategoryController.Post(category);
                    setSuccessMessage("Created category successfully.");
                    setShowSuccessModal(true);
                    setUpdate(true);
                }
                setCategory(newCategory);
            } catch (error) {
                setErrorMessage(error.message); // Set error message
                setShowErrorModal(true); // Show modal
                // alert("js sucks");
            }

    }

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setCategory(prevCategory => {
            const newCategory = Category.createCategoryFromCopy(prevCategory);

            // Use the hasField method to check if the field exists
            if (newCategory.hasField(name)) {
                newCategory[name] = value; 
            }

            return newCategory;
        });
    }

    // Function to close the error modal
    const closeErrorModal = () => {
        setShowErrorModal(false);
    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
    };

    const setCategoryFromExisting = async (categoryId) => {
        if (!categoryId) {
            return;
        }

        try {
            const existingCategory = await CategoryController.Get(categoryId);

            setCategory(existingCategory);
            setUpdate(true);
        }
        catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }
    };

    return (
        <>
        <Row>



            <Col>
            <Form validated={validated} onSubmit={handleSave}>
                <Form.Group controlId="formtestTitle" className="input">
                    <Form.Label>{t('categories.categoryName')}</Form.Label>
                    <Form.Control
                        name={Category.varTitleName()}
                        value={category.title}
                        autoComplete='off'
                        placeholder={t('categories.enterCategoryName')}
                        className="form-control darkInput"
                        onChange={handleFieldChange}
                        required type="text"
                        minLength={ValidationConstants.MinTitleLength}
                        maxLength={ValidationConstants.MaxTitleLength}
                        pattern={ValidationPatternConstants.TitlePattern.source}
                    />
                    <Form.Control.Feedback type="invalid">
                        {t('categories.plsEnterCategoryName')}{'.'}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formtestText" className="input">
                    <Form.Label>{t('categories.categoryContent')}</Form.Label>
                    <Form.Control
                        name={Category.varTextName()}
                        value={category.text}
                        as="textarea"
                        rows={3}
                        className="form-control darkInput"
                        required type="text"
                        autoComplete='off'
                        placeholder={t('categories.enterCategoryContent')}
                        onChange={handleFieldChange}
                        minLength={ValidationConstants.MinParagraphLength} // FIXME: Change to category
                        maxLength={ValidationConstants.MaxParagraphLength} // FIXME: Change to category
                        pattern={ValidationPatternConstants.ParagraphPattern.source} // FIXME: Change to category
                    />
                    <Form.Control.Feedback type="invalid">
                        {t('categories.plsEnterCategoryContent')}{'.'}
                    </Form.Control.Feedback>
                </Form.Group>

            </Form>

            {/* Error Popup */}
            <ErrorPopup
                showErrorModal={showErrorModal}
                errorMessage={errorMessage}
                onClose={closeErrorModal}
            />

            {/* Success Popup */}
            <SuccessPopup
                showCreateModal={showSuccessModal}
                message={successMessage}
                onClose={closeSuccessModal}
            />

            <DeletePopup
                showDeleteModal={showDeleteModal}
                message={deleteMessage}
                onClose={closeDeleteModal}
                onDelete={deleteConfirmed}
            />

        </Col>

        <Col>
            <Form>
            <Form.Group
              className="d-flex justify-content-center"
              style={{ marginBottom: '20px' }}
            >
              <Image height="200" src={imageFileUrl} alt="Uploaded Image" />
            </Form.Group>
            <Form.Group
              className="d-flex justify-content-center"
              style={{ marginBottom: '20px' }}
            >
              <input
                className="form-control darkInput"
                type="file"
                onChange={handleFileUpload}
              />
            </Form.Group>

                {category.imageFileName && (
                        <Col>

                            <Button onClick={getCategoryImage} className='buttons blue' style={{marginBottom:'10px'}}><GrRevert className="icons" /> {t('commonUIelements.resetImg')}</Button>
                        </Col>
                    )}

                    {category.imageFileName && (
                        <Col>

                            <Button className='buttons pink' onClick={deleteCategoryImage}><MdDelete className="icons" /> {t('commonUIelements.deleteImg')}</Button>
                        </Col>
                    )}
            </Form>
            </Col>

        <Form validated={validated} onSubmit={handleSave}>
        <Button className='buttons cyan' type="submit" style={{ marginTop: '10px', width: '100%'}}>
            {update ? t('commonUIelements.update') : t('commonUIelements.create')}
          </Button>
          </Form>

        </Row>
        </>
    )
}

export default EditCategory;