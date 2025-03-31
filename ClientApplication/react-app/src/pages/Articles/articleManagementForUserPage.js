import React from "react";
import { useNavigate } from 'react-router-dom';
import { ArticleList } from "../../.components/.MainComponentsExport";
import "../../styles/Articles/articleManagementPage.css";
import { Row, Col, Button } from 'react-bootstrap';
import { FaPlusSquare } from "react-icons/fa";
import { useTranslation } from 'react-i18next'; 
import { useState, useEffect } from 'react';

const ArticleUserHomePage = ({ loggedInUser }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [settings, setSettings] = useState(null);

    useEffect(() => {
        if (loggedInUser) {
            setSettings({
                showEditButton: true,
                showPlayButton: true,
                showSearchBar: true
            });
        } else 
            setSettings({
                showEditButton: false,
                showPlayButton: true,
                showSearchBar: true
            });
    }, [loggedInUser]);


    const redirectToCreateArticle = () => {
        navigate('/create-article');
    }

    const redirectToCreateParagraph = () => {
        navigate('/create-paragraph');
    }

    const redirectToCreateQuestion = () => {
        navigate('/create-question');
    }

    const getSelectedArticle = (articleId) => {
        navigate(`/edit-all?articleId=${articleId}`);
    }

    const getPlayArticle = (articleId) => {
        navigate(`/exercise?articleId=${articleId}`);
    }
    

    return (
        <>
            {/* Only show this block if a user is logged in */}
            {loggedInUser && (
                <div className="article-home-page">
                    <h2>{t('articleManagment.myArticles')}</h2>
                    <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                        <Row className='row'>
                            <Col xs={12} md={4}>
                                <Button size="lg" className='buttons deepPurple' onClick={redirectToCreateArticle}>
                                    <FaPlusSquare className="icons"/> {t('articleManagment.createArticle')}
                                </Button>
                            </Col>
                            <Col xs={12} md={4}>
                                <Button size="lg" className='buttons orange' onClick={redirectToCreateParagraph}>
                                    <FaPlusSquare className="icons"/> {t('articleManagment.createParagraph')}
                                </Button>
                            </Col>
                            <Col xs={12} md={4}>
                                <Button size="lg" className='buttons teal' onClick={redirectToCreateQuestion}>
                                    <FaPlusSquare className="icons"/> {t('articleManagment.createQuestion')}
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <h2>{t('articleManagment.articleList')}</h2>
                </div>
            )}

            {!loggedInUser && (
                <div className="article-home-page">
                    <h2>{t('articleManagment.articleList')}</h2>
                </div>
            )}
            <ArticleList 
                settings={settings}
                getEditing={getSelectedArticle}
                getPlay={getPlayArticle}
                userId={loggedInUser ? loggedInUser.id : null}
            />
        </>
    );
}

export default ArticleUserHomePage;
