import React from 'react';
import '../../styles/Articles/createArticleStyle.css';
import { CreateEditCategory, ReturnToCategoriesButton } from '../../.components/.MainComponentsExport';
import { Row, Col } from 'react-bootstrap';

import { useSearchParams } from 'react-router-dom';  // Import hook for query params

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; 

const CreateCategory = () => {
    const [searchParams] = useSearchParams();
    const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        setCategoryId(searchParams.get('categoryId'));
    }, [searchParams]); // Only runs when searchParams changes
    
    const { t } = useTranslation();

    return (
        <>
            <ReturnToCategoriesButton />

            <div className="category-home-page">
                <h2>{t('categories.createCategory')}</h2> 
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important", borderStyle:"dashed", borderWidth:"thick", borderColor:"var(--color-cyan-dark)"}}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        <CreateEditCategory
                            existingCategoryId={categoryId}
                        />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CreateCategory;