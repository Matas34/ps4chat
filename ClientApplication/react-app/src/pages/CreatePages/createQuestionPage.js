import React from 'react';
import '../../styles/Articles/createArticleStyle.css';
import { Row, Col } from 'react-bootstrap';

import { CreateEditQuestion, ReturnToArticlesButton } from '../../.components/.MainComponentsExport';

import { useTranslation } from 'react-i18next'; 

const CreateQuestion = () => {

    const { t } = useTranslation();

    return (
        <>
            <ReturnToArticlesButton />

            <div className="create-article-page">
                <h2>{t('articleManagment.createQuestion')}</h2>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important", borderStyle:"dashed", borderWidth:"thick", borderColor:"var(--color-teal-dark)"}}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        <CreateEditQuestion />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CreateQuestion;