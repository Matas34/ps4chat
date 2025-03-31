import React from "react";
import { useNavigate } from 'react-router-dom';
import { ArticleList } from "../../.components/.MainComponentsExport";
import "../../styles/Articles/articleManagementPage.css";
import { Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; 
import { useState, useEffect } from 'react';

const ArticleHomePage = ({ loggedInUser }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [settings, setSettings] = useState(null);

    useEffect(() => {
        setSettings({
            showEditButton: false,
            showPlayButton: true,
            showSearchBar: true
        });
    }, [loggedInUser]);

    const getSelectedArticle = (articleId) => {
        navigate(`/edit-all?articleId=${articleId}`);
    }

    const getPlayArticle = (articleId) => {
        navigate(`/exercise?articleId=${articleId}`);
    }

    const redirectToUserArticles = () => {
        navigate('/user-articles');
    }
    
    return (
        <>
            {/* Only show this block if a user is logged in */}
            {loggedInUser && (
                <div className="article-home-page">
                    <h2>{t('articleManagment.articleHomePage')}</h2>
                    <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                        <Row className='row'>
                            <Col xs={12} md={12}>
                                <Button size="lg" className='buttons deepPurple' onClick={redirectToUserArticles}>
                                    {t('articleManagment.userArticles')}
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
            />
        </>
    );
}

export default ArticleHomePage;
