import React from 'react';
import '../../styles/Articles/createArticleStyle.css';
import { Row, Col } from 'react-bootstrap';

import { CreateEditParagraph, ReturnToArticlesButton } from '../../.components/.MainComponentsExport';

import { useTranslation } from 'react-i18next'; 

const CreateParagraph = () => {

    const { t } = useTranslation();

    return (
        <>
            <ReturnToArticlesButton />

            <div className="create-article-page">
                <h2>{t('articleManagment.createParagraph')}</h2>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important", borderStyle:"dashed", borderWidth:"thick", borderColor:"var(--color-orange-dark)"}}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        <CreateEditParagraph />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CreateParagraph;

