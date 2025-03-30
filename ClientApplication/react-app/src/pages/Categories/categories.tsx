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

const Categories = () => {

    const { t } = useTranslation();

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const user = UserManager.getUser();
        setUser(user);
    }, []);

    const navigate = useNavigate();

    const redirectToCreateCategory = () => {
        navigate('/user-categories');
    }

    const settings = {
        showSelectButton: true,
    }

    const selectedCategory = (id) => {
        navigate(`/category?id=${id}`);
    }

    return (
        <>
            <div className="category-home-page">
                <h2>{t('categories.categories')}</h2>
            </div>
            <div>
                <div className='mainContainer' style={{ backgroundColor: "red !important", marginBottom: "1rem" }}>
                    <Row className='row'>
                        <Col xs={12} md={12
                        } >
                            <p style={{ fontSize: "24px", color: "#d9d9d9", marginBottom: "0px", textAlign: "center", marginTop: "5px" }}>{t('categories.chooseCategories')}</p>
                        </Col>

                    </Row>
                    
                </div>
                {user && (
                        <div className='mainContainer' style={{ backgroundColor: "red !important", marginBottom: "1rem" }}>

                            <Row className='row'>
                                <Col xs={12} md={12}>
                                    <Button size="lg" className='buttons cyan' onClick={redirectToCreateCategory}><FaPlusSquare className="icons" /> {t('categories.myCategories')}</Button>
                                </Col>
                            </Row>
                        </div>

                    )}
            </div>

            <CategoryList
                settings={settings}
                getSelected={selectedCategory}
                getEditing={() => { }}
                update={false}
            />



            {/* <div className='mainContainer'>
                <Row className='rowCategories'>
                    <Col xs={12} md={2}>
                        <Button size="lg" className='buttons lime' onClick={() => { }}><GiMicroscope className="icons" />  {t('categories.biology')}</Button>
                    </Col>
                    <Col className='categories'>{t('categories.bCategories')}{'...'}</Col>
                </Row >

                <Row className='rowCategories'>

                    <Col xs={12} md={2}>
                        <Button size="lg" className='buttons indigo' onClick={() => { }}><GiFallingStar className="icons" />  {t('categories.astronomy')}</Button>
                    </Col>
                    <Col className='categories'>{t('categories.aCategories')}{'...'}</Col>
                </Row>

                <Row className='rowCategories'>
                    <Col xs={12} md={2}>
                        <Button size="lg" className='buttons yellow' onClick={() => { }}><GiBlackKnightHelm className="icons" /> {t('categories.history')}</Button>
                    </Col>
                    <Col className='categories'>{t('categories.hCategories')}{'...'}</Col>
                </Row>

                <Row>
                    <Col xs={12} md={2}>
                        <Button size="lg" className='buttons pink' onClick={() => { }}><GiBookmark className="icons" /> {t('categories.literature')}</Button>
                    </Col>
                    <Col className='categories'>{t('categories.lCategories')}{'...'}</Col>
                </Row>

            </div> */}
        </>

    )
}

export default Categories;