import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next'; 

const ReturnToArticlesButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const redirectToArticlePage = () => {
        navigate('/articles');
    }

    return (
        <div className='create-article-page'>
            <Row className='row'>
                <Col xs={4} md={3}>
                    <Button 
                        className='buttons purple' 
                        size="lg" 
                        onClick={redirectToArticlePage}
                        aria-label={t('articles.returnToArticlesBtn.main')}
                    >
                        <IoReturnUpBack className="icons" data-testid="return-icon" /> {t('articles.returnToArticlesBtn.main')}
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default ReturnToArticlesButton;
