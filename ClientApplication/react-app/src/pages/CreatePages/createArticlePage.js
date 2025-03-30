import React from 'react';
import '../../styles/Articles/createArticleStyle.css';
import { CreateEditArticle, ReturnToArticlesButton } from '../../.components/.MainComponentsExport';
import { Row, Col } from 'react-bootstrap';

import { useTranslation } from 'react-i18next'; 
const CreateArticle = () => {

    const { t } = useTranslation();

    return (
        <>
            <ReturnToArticlesButton />

            <div className="create-article-page">
                <h2>{t('articleManagment.createArticle')}</h2>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important", borderStyle:"dashed", borderWidth:"thick", borderColor:"var(--color-deepPurple-dark)"}}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        <CreateEditArticle/>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CreateArticle;