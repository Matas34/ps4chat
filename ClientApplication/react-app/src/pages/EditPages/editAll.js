import { React, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';  // Import hook for query params
import '../../styles/Articles/createArticleStyle.css';
import { CreateEditArticle, CreateEditParagraph, ReturnToArticlesButton, CreateEditQuestion } from '../../.components/.MainComponentsExport';
import { Row, Col } from 'react-bootstrap';
import { ParagraphList, QuestionList, ArticleList } from '../../.components/.MainComponentsExport';

import { useTranslation } from 'react-i18next';
import { UserManager } from '../../.controllers/.dataProcessingHelpers/DataProccessingHelpersExport';
import { useNavigate } from 'react-router-dom';

const EditArticleParagraphQuestion = () => {
  const navigate = useNavigate();

    const [userId, setUserID] = useState(-1);

    const { t } = useTranslation();

    // Get search params from the URL
    const [searchParams] = useSearchParams();
    const [articleId, setArticleId] = useState(null);
    const [paragraphId, setParagraphId] = useState(null);
    const [questionId, setQuestionId] = useState(null);

    const [updateArticleList, setUpdateArticleList] = useState(false);
    const [updateParagraphList, setUpdateParagraphList] = useState(false);
    const [updateQuestionList, setUpdateQuestionList] = useState(false);

    // Get the articleId from the query string, or default to null if not provided
    useEffect(() => {
        let user = UserManager.getUser();
        if (user !== null && user !== undefined) {
            setUserID(user.id);
        }        
        setArticleId(searchParams.get('articleId'));
    }, [searchParams]); // Only runs when searchParams changes

    const getSelectedArticle = (articleId) => {
        setArticleId(articleId);
        setParagraphId(null);
        setQuestionId(null);
        setUpdateParagraphList(!updateParagraphList);
    }

    const getSelectedParagraph = (paragraphId) => {
        setParagraphId(paragraphId);
        setQuestionId(null);
        setUpdateQuestionList(!updateQuestionList);
    }

    const getSelectedQuestion = (questionId) => {
        setQuestionId(questionId);
    }

    const receiveArticleId = (articleId) => {
        setArticleId(articleId);
        setUpdateParagraphList(!updateParagraphList);
    }

    const receiveParagraphId = (paragraphId) => {
        setParagraphId(paragraphId);
        setUpdateParagraphList(!updateParagraphList);
        setUpdateQuestionList(!updateQuestionList);
    }

    const receiveQuestionId = (questionId) => {
        setQuestionId(questionId);
        setUpdateQuestionList(!updateQuestionList);
    }

    const resetArticleId = () => {
        setArticleId(null);
        setParagraphId(null);
        setQuestionId(null);
    }

    const resetParagraphId = () => {
        setParagraphId(null);
        setQuestionId(null);
    }

    const resetQuestionId = () => {
        setQuestionId(null);
    }

    const triggerUpdateArticleList = () => {
        setUpdateArticleList(!updateArticleList)
    }

    const triggerUpdateParagraphList = () => {
        setUpdateParagraphList(!updateParagraphList)
    }

    const triggerUpdateQuestionList = () => {
        setUpdateQuestionList(!updateQuestionList)
    }

    const noArticleFound = () => {
        navigate('/edit-all');
    }

    return (
        <>
            <ReturnToArticlesButton />

            <div className="create-article-page">
                <h2>{t('editPages.all.editAll')}</h2>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important", borderStyle:"dashed", borderWidth:"thick", borderColor:"var(--color-cyan-dark)"}}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={4}  className="column-with-divider">
                        {
                            articleId ? (
                                <CreateEditArticle
                                    key={`edit-${articleId}`}
                                    existingArticleId={articleId}
                                    noArticleFound={noArticleFound}
                                    redirect={false}
                                    sendUpdate={triggerUpdateArticleList}
                                    userId={userId}
                                />
                            ) : (
                                <CreateEditArticle
                                    sendCreatedId={receiveArticleId}
                                    redirect={false}
                                    sendUpdate={triggerUpdateArticleList}
                                    userId={userId}
                                />
                            )}
                    </Col>
                    <Col xs={12} md={4}  className="column-with-divider">
                        {
                            paragraphId ? (
                                <CreateEditParagraph
                                    key={`edit-${paragraphId}`}
                                    existingParagraphId={paragraphId}
                                    redirect={false}
                                    sendUpdate={triggerUpdateParagraphList}
                                    userId={userId}
                                />
                            ) : articleId ? (
                                <CreateEditParagraph
                                    articleFromOutsideId={articleId}
                                    sendCreatedId={receiveParagraphId}
                                    redirect={false}
                                    sendUpdate={triggerUpdateParagraphList}
                                    userId={userId}
                                />
                            ) : (
                                <p>{t('editPages.all.parUnavailable')}</p>
                            )
                        }
                    </Col>
                    <Col xs={12} md={4} className="column-with-divider last-column">
                        {
                            questionId ? (
                                <CreateEditQuestion
                                    key={`edit-${questionId}`}
                                    existingQuestionId={questionId}
                                    redirect={false}
                                    sendUpdate={triggerUpdateQuestionList}
                                    userId={userId}
                                />
                            ) : paragraphId ? (
                                <CreateEditQuestion
                                    paragraphFromOutsideId={paragraphId}
                                    sendCreatedId={receiveQuestionId}
                                    redirect={false}
                                    sendUpdate={triggerUpdateQuestionList}
                                    userId={userId}
                                />
                            ) : (
                                <p>{t('editPages.all.questUnavailable')}</p>
                            )
                        }
                    </Col>
                </Row>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={4}>
                        {
                            articleId ? (
                                <Button onClick={resetArticleId} className="buttons lightBlue" style={{width:"auto"}}>{t('editPages.all.resetArticle')}</Button>
                            ) : (
                                <Button onClick={resetArticleId} className="buttons lightBlue" style={{width:"auto"}} disabled>{t('editPages.all.resetArticle')}</Button>
                            )
                        }
                    </Col>
                    <Col xs={12} md={4}>
                        {
                            paragraphId ? (
                                <Button onClick={resetParagraphId} className="buttons lightBlue" style={{width:"auto"}}>{t('editPages.all.resetParagraph')}</Button>
                            ) : (
                                <Button onClick={resetParagraphId} className="buttons lightBlue" style={{width:"auto"}} disabled>{t('editPages.all.resetParagraph')}</Button>
                            )
                        }
                    </Col>
                    <Col xs={12} md={4}>
                        {
                            questionId ? (
                                <Button onClick={resetQuestionId} className="buttons lightBlue" style={{width:"auto"}}>{t('editPages.all.resetQuestion')}</Button>
                            ) : (
                                <Button onClick={resetQuestionId} className="buttons lightBlue" style={{width:"auto"}} disabled>{t('editPages.all.resetQuestion')}</Button>
                            )
                        }
                    </Col>
                </Row>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={4}>
                        <ArticleList
                            settings={{ showSelectButton: true, showDeleteButton: true }}
                            getSelected={getSelectedArticle}
                            update={updateArticleList}
                            userId={userId}
                            />
                    </Col>
                    <Col xs={12} md={4}>
                        {
                            articleId ? (
                                <ParagraphList
                                    articleId={articleId}
                                    settings={{ showSelectButton: true, showDeleteButton: true }}
                                    getSelected={getSelectedParagraph}
                                    update={updateParagraphList}
                                />
                            ) : (
                                <p>{t('editPages.all.parsUnavailable')}</p>
                            )
                        }
                    </Col>
                    <Col xs={12} md={4}>
                        {
                            paragraphId ? (
                                <QuestionList
                                    paragraphId={paragraphId}
                                    settings={{ showSelectButton: true, showDeleteButton: true }}
                                    getSelected={getSelectedQuestion}
                                    update={updateQuestionList}
                                />
                            ) : (
                                <p>{t('editPages.all.questionsUnavailable')}</p>
                            )
                        }
                    </Col>
                </Row>
            </div>


        </>
    );
};

export default EditArticleParagraphQuestion;
