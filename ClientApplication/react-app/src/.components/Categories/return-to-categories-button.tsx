import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import React from 'react';


import { useTranslation } from 'react-i18next'; 

const ReturnToCategoriesButton = () => {

    const { t } = useTranslation();

    const navigate = useNavigate();
    const redirectToCategoriesPage = () => {
        navigate('/categories');
    }

    return (
        <div className='create-article-page'>
            <Row className='row'>
                <Col xs={4} md={3}>
                    <Button className='buttons purple' size="lg" onClick={redirectToCategoriesPage}><IoReturnUpBack className="icons" /> {t('categories.returnToCategories')}</Button>
                </Col>
            </Row>
        </div>
    );

}

export default ReturnToCategoriesButton