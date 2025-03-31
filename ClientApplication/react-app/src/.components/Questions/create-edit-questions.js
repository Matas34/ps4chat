import { React, useState, useEffect } from 'react';
import { Row, Col, Button, Form, Image } from 'react-bootstrap';
import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';
import { Question } from '../../.entities/.MainEntitiesExport';
import ParagraphSearch from '../Paragraphs/paragraph-search';
import { ParagraphController, QuestionController } from '../../.controllers/.MainControllersExport';
import ErrorPopup from '../.common-components/ErrorPopup';
import AnswerItem from './answerItem';
import Divider from '@mui/material/Divider';
import SuccessPopup from '../.common-components/SuccessPopup';
import DeletePopup from '../.common-components/DeletePopup';
import { MdDelete } from "react-icons/md";
import NoImage from '../../no-image.png'
import { GrRevert } from "react-icons/gr";

import { useTranslation } from 'react-i18next'; 


import { MdOutlineAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const EditQuestions = ({ 
    paragraphFromOutsideId = undefined, 
    existingQuestionId = undefined, 
    sendCreatedId = undefined, 
    redirect = true, 
    sendUpdate = undefined,
    noQuestionFound = undefined, 
    userId = undefined,
}) => {
    
  const navigate = useNavigate();


    const { t } = useTranslation();
    
    const [question, setQuestion] = useState(
        new Question()
    );
    const [validated, setValidated] = useState(false);
    const [update, setUpdate] = useState(false);

    const [errorMessage, setErrorMessage] = useState([""]); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

    const [answers, setAnswers] = useState([]);
    let answerCount = 0;
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);

    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State to show/hide modal

    const [outsideParagraph, setOutsideParagraph] = useState(null);

    const [MyRedirect, setRedirect] = useState(redirect);

    const [imageFileUrl, setImageUrl] = useState(NoImage)
    const [imageFile, setImageFile] = useState(undefined)
    const [updateImageFile, setUpdateImageFile] = useState(false)

    const [deleteMessage, setDeleteMessage] = useState(""); // State for success message
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State to show/hide modal
    const [deleteRequest, setDeleteRequest] = useState(null)

    const [noQuestion, setNoQuestion] = useState(false);

    useEffect(() => {
        getParagraphFromOutside(paragraphFromOutsideId);
    }, [paragraphFromOutsideId]); // Add articleFromOutside as a dependency

    useEffect(() => {
        setQuestionFromExisting(existingQuestionId);
    }, [existingQuestionId]); // Add articleFromOutside as a dependency

    useEffect(() => {
        setRedirect(redirect);
    }, []); // Add redirect as a dependency

    useEffect(() => {
        if (question && question.imageFileName) {
            getQuestionImage(); // Fetch image when the article is updated
        }
    }, [question.imageFileName]);

    useEffect(() => {
        updateQuestionImage();
    }, [question.id]);

    // save the image, then if user creates or updates the question, do the same for the image
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

    const getQuestionImage = async () => {
        try {
            if (question.imageFileName) {
                let imageURL = await QuestionController.GetImage(question.id);
                setImageUrl(imageURL);
                setImageFile(undefined);
                setUpdateImageFile(false);
            }
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }
    }

    const updateQuestionImage = async () => {
        try {
            if (question.id === null) {
                return;
            }
            if (question.imageFileName === null && imageFile) {
                await QuestionController.PostImage(question.id, imageFile);
                question.imageFileName = "hasImage";
            } else if (question.imageFileName && imageFile && updateImageFile) {
                await QuestionController.DeleteImage(question.id);
                await QuestionController.PostImage(question.id, imageFile);
                question.imageFileName = "hasImage";
                imageFile === undefined
                setUpdateImageFile(false);
            }
        } catch (err) {
            throw err;
        }
    }

    const deleteQuestionImage = () => {
        if (!question.imageFileName) {
            return;
        }
        setDeleteRequest(1);
        setShowDeleteModal(true);
        setDeleteMessage("Are you sure you want to delete the image?");
    }

    const deleteConfirmed = async () => {
        setShowDeleteModal(false);
        if (deleteRequest === 1) {
            try {
                if (question.imageFileName) {
                    await QuestionController.DeleteImage(question.id);
                    question.imageFileName = null;
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

        if (correctAnswerIndex === -1) {
            setErrorMessage("Please select a correct answer.");
            setShowErrorModal(true);
            return;
        }

        if (answers.length < ValidationConstants.MinAnswerChoicesCount) {
            setErrorMessage("Please add at least 2 answers.");
            setShowErrorModal(true);
            return;
        }

        if (question && question.paragraphId) {
            try {
                try {
                    const paragraph = await ParagraphController.Get(question.paragraphId);
                } catch (error) {
                    throw new Error("Paragraph ID does not exist.");
                }

                let newQuestion;
                if (update) {
                    newQuestion = await QuestionController.Put(question);
                    setRedirect(false);
                    setSuccessMessage("Updated question successfully.");
                    setShowSuccessModal(true);
                    updateQuestionImage();
                    if (sendUpdate) {
                        sendUpdate();
                    }
                } else {
                    newQuestion = await QuestionController.Post(question);
                    setUpdate(true);
                    setSuccessMessage("Created question successfully.");
                    setShowSuccessModal(true);
                }
                setQuestion(newQuestion);
            } catch (error) {
                setErrorMessage(error.message); // Set error message
                setShowErrorModal(true); // Show modal
            }
        } else {
            setErrorMessage("Please enter paragraph ID."); // Set error message
            setShowErrorModal(true); // Show modal
        }
    }

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setQuestion(prevQuestion => {
            const newQuestion = Question.createQuestionFromCopy(prevQuestion);

            // Use the hasField method to check if the field exists
            if (newQuestion.hasField(name)) {
                if (name === newQuestion.varParagraphIdName) {
                    newQuestion.paragraphId = Number(value);
                } else {
                    newQuestion[name] = value; // Use setter for the corresponding field
                }
            }

            return newQuestion;
        });
    }

    const updateParagraphId = (paragraphId) => {
        setQuestion(prevQuestion => {
            const newQuestion = Question.createQuestionFromCopy(prevQuestion);

            newQuestion.paragraphId = Number(paragraphId);

            return newQuestion;
        });
    }

    // Function to close the error modal
    const closeErrorModal = () => {
        setShowErrorModal(false);
        if (noQuestion) {
            noQuestionFound();
        }
    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
        if (MyRedirect) {
            navigate(`/edit-question?questionId=${question.id}`);
        }
        if (sendCreatedId) {
            sendCreatedId(question.id);
        }
    }

    const sendBackText = (index, text) => {
        let newAnswers = [...answers];
        newAnswers[index].text = text;

        let answersText = newAnswers.map((answer) => answer.text);

        setQuestion(prevQuestion => {
            const newQuestion = Question.createQuestionFromCopy(prevQuestion);

            newQuestion.answerChoices = answersText;

            return newQuestion;
        });

        setAnswers(newAnswers);
    }

    const deleteAnswer = (index) => {
        answers.splice(index, 1);
        let newAnswers = [...answers];
        setAnswers(newAnswers);

        if (index === correctAnswerIndex) {
            setCorrectAnswerIndex(-1);

            setQuestion(prevQuestion => {
                const newQuestion = Question.createQuestionFromCopy(prevQuestion);

                newQuestion.correctAnswerIndex = null;

                return newQuestion;
            });
        }
    }

    const addEmptyAnswer = () => {
        // add text and index as empty string
        let newAnswers = [...answers];
        newAnswers.push({
            text: "",
            index: answerCount
        });
        answerCount += 1;
        setAnswers(newAnswers);
    }

    const setCorrect = (index) => {
        setCorrectAnswerIndex(index);
        let newAnswers = [...answers];
        setAnswers(newAnswers);
        setQuestion(prevQuestion => {
            const newQuestion = Question.createQuestionFromCopy(prevQuestion);
            newQuestion.correctAnswerIndex = index;
            return newQuestion;
        });
    }

    const getParagraphFromOutside = async (parFromOut) => {
        if (parFromOut) {
            let paragraph = null;
            try {
                paragraph = await ParagraphController.Get(parFromOut);
            } catch (error) {
                setErrorMessage(error.message); // Set error message
                setShowErrorModal(true); // Show modal
            }

            if (paragraph) {
                setOutsideParagraph(paragraph);
                setQuestion(prevQuestion => {
                    const newQuestion = Question.createQuestionFromCopy(prevQuestion);

                    newQuestion.paragraphId = Number(paragraph.id);

                    return newQuestion;
                });
            }
        }
    }

    const setQuestionFromExisting = async (exQuesId) => {
        if (!exQuesId) {
            return;
        }

        let existingQuestion = null;
        try {
            existingQuestion = await QuestionController.Get(exQuesId);
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }

        if (existingQuestion) {
            setQuestion(existingQuestion);
            answerCount = existingQuestion.answerChoices.length;
            let newAnswers = [];
            for (let i = 0; i < existingQuestion.answerChoices.length; i++) {
                newAnswers.push({
                    text: existingQuestion.answerChoices[i],
                    index: i
                });
            }
            setAnswers(newAnswers);
            answerCount = existingQuestion.answerChoices.length;


            setCorrectAnswerIndex(existingQuestion.correctAnswerIndex);
            setUpdate(true);

            try {
                let paragraph = await ParagraphController.Get(existingQuestion.paragraphId);
                setOutsideParagraph(paragraph);
            } catch (error) {
                setErrorMessage(error.message); // Set error message
                setShowErrorModal(true); // Show modal
                setNoQuestion(true);
            }
        }

    }


    return (
        <>
<Row>
    <Col>
            <Form validated={validated} onSubmit={handleSave}>

            {outsideParagraph ? "" :
                (
                    <ParagraphSearch
                        onParagraphSelected={updateParagraphId}
                        paragraphFromOutside={outsideParagraph}
                        userId={userId}
                    />
                )}

                {
                    outsideParagraph ? "" :
                        (
                            <Form.Group controlId="formtestTitle" className="input">
                                <Form.Label>{t('questions.createEdit.paragraphID')}</Form.Label>
                                <Form.Control
                                    name={Question.varParagraphIdName()}
                                    value={question.paragraphId}
                                    required type="number"
                                    autoComplete='off'
                                    className="form-control darkInput"
                                    placeholder={t('questions.createEdit.enterParagraphID')}
                                    onChange={handleFieldChange}
                                    pattern={ValidationPatternConstants.IdPattern.source}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {t('questions.createEdit.plsEnterParagraphID')}{'.'}
                                </Form.Control.Feedback>
                            </Form.Group>
                        )
                }

                <Form.Group controlId="formtestTitle" className="input">
                    <Form.Label>{t('questions.createEdit.questionText')}</Form.Label>
                    <Form.Control
                        name={Question.varTextName()}
                        value={question.text}
                        as="textarea"
                        rows={3}
                        required type="text"
                        autoComplete='off'
                        className="form-control darkInput"
                        placeholder={t('questions.createEdit.eneterQuestionText')}
                        onChange={handleFieldChange}
                        minLength={ValidationConstants.MinQuestionTextLength}
                        maxLength={ValidationConstants.MaxQuestionTextLength}
                        pattern={ValidationPatternConstants.QuestionTextPattern.source}
                    />
                    <Form.Control.Feedback type="invalid">
                        {t('questions.createEdit.plsEnterQuestionText')}{'.'}
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
                <Form.Group className="d-flex justify-content-center"  style={{marginBottom: '20px'}} >
                    <Image height="200" src={imageFileUrl} alt="Uploaded Image" />
                </Form.Group>
                <Form.Group className="d-flex justify-content-center" >
                    <div>
                        <input
                            className="form-control darkInput"
                            type="file"
                            onChange={handleFileUpload}
                        />
                    </div>
                </Form.Group>
                <Row>
                    {question.imageFileName && (
                        <Col>

                            <Button className="buttons blue" onClick={getQuestionImage} style={{marginBottom:'10px'}}><GrRevert className='icons'/> {t('commonUIelements.resetImg')}</Button>
                        </Col>
                    )}

                    {question.imageFileName && (
                        <Col>

                            <Button className="buttons pink" onClick={deleteQuestionImage}><MdDelete className='icons'/> {t('commonUIelements.deleteImg')}</Button>
                        </Col>
                    )}

                </Row>
            </Form>
        </Col>
</Row>
<Row>
<Form validated={validated} onSubmit={handleSave}>
<div>
<Divider style={{ backgroundColor: '#ccc', borderBottomWidth: 3, marginTop:'10px', marginBottom: '15px' }}></Divider>

                    <Row style={{ marginBottom: '15px'}} >
                        <Col xs={12} md={10} >
                            <Button className="buttons cyan" style={{width:"auto"}}  onClick={() => addEmptyAnswer()}><MdOutlineAdd className='icon'/> {t('questions.createEdit.addAnswer')}</Button>
                        </Col>
                    </Row>
                    <Divider style={{ backgroundColor: '#ccc', borderBottomWidth: 3}}></Divider>

                    {answers.map((answer, index) => (
                        <div key={answer.index}>
                            <AnswerItem
                                index={index}
                                articleText={answer.text}
                                sendBackText={sendBackText}
                                deleteAnswer={deleteAnswer}
                                setCorrect={setCorrect}
                                correctAnswerIndex={correctAnswerIndex}
                            />
                            <Divider style={{ backgroundColor: '#ccc', borderBottomWidth: 3 }}></Divider>

                        </div>
                    ))}
                    <Divider style={{marginBottom: '5px', borderBottomWidth: 3}}></Divider>
                </div>


                <Button className='buttons teal' type="submit" style={{ marginTop: '10px', width: '100%'}}>
                    {update ? t('commonUIelements.update') : t('commonUIelements.create')}
                </Button>
                </Form>
</Row>
        </>
    )
}

export default EditQuestions;