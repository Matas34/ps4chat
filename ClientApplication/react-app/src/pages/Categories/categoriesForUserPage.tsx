import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

import { GiFallingStar } from "react-icons/gi";
import { GiMicroscope } from "react-icons/gi";
import { GiBookmark } from "react-icons/gi";
import { GiBlackKnightHelm } from "react-icons/gi";
import { FaPlusSquare } from "react-icons/fa";

import { useTranslation } from 'react-i18next';
import '../../styles/Categories/categories.css';

import { CategoryList } from '../../.components/.MainComponentsExport';

import { useEffect, useState } from 'react';
import { UserManager } from '../../.controllers/.dataProcessingHelpers/DataProccessingHelpersExport';
import { CategoryController } from '../../.controllers/categoryController';
const CategoriesUserEditing = () => {

    const { t } = useTranslation();

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const user = UserManager.getUser();
        setUser(user);
    }, []);

    const navigate = useNavigate();

    const redirectToCreateCategory = () => {
        navigate('/create-category');
    }

    const settings = {
        showEditButton: true,
        showDeleteButton: true
    }

    const selectedCategory = (id) => {
        navigate(`/category?id=${id}`);
    }

    const editCategory = (id) => {
        navigate(`/create-category?categoryId=${id}`);
    }

    return (
        <>
            <div className="category-home-page">
                <h2>{t('categories.userCategories')}</h2>
            </div>
            <div>
                <div className='mainContainer' style={{ backgroundColor: "red !important", marginBottom: "1rem" }}>
                    <Row className='row'>
                        {user && (
                            <Col xs={12} md={12}>
                                <Button size="lg" className='buttons cyan' onClick={redirectToCreateCategory}><FaPlusSquare className="icons" /> {t('categories.createCategory')}</Button>
                            </Col>
                        )}
                    </Row>
                </div>
            </div>

            <CategoryList
                settings={settings}
                getSelected={selectedCategory}
                getEditing={editCategory}
                update={false}
                userId={user ? user.id : -1}
            />



           
        </>

    );
}

export default CategoriesUserEditing;