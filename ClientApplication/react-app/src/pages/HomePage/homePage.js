import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import { MdArticle } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import "../../styles/HomePage/homePage.css";
import { FaBookReader } from "react-icons/fa";

import FlashingText from '../../.components/HomePage/FlashingText';

import { useTranslation } from 'react-i18next'; 
import { ArticleList } from "../../.components/.MainComponentsExport";

const Landing = () => {

    const { t } = useTranslation();

    const navigate = useNavigate();

    const redirectToCategories = () => {
        navigate('/categories');
    };
    const redirectToArticles = () => {
        navigate('/articles');
    };
    const redirectToExercise = () => {
        navigate('/exercise');
    };

    return (
        <>
            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='row'>
                    <Col xs={12} md={4}>
                        <Button
                            className='buttons purple'
                            size="lg"
                            onClick={redirectToCategories}
                            data-testid="go-to-categories-button"
                        >
                            <BiSolidCategory className='icon'/> {t('homepage.goToCategories')}
                        </Button>
                    </Col>
                    <Col xs={12} md={4}>
                        <Button
                            className='buttons deepPurple'
                            size="lg"
                            onClick={redirectToArticles}
                            data-testid="go-to-articles-button"
                        >
                            <MdArticle className='icon'/> {t('homepage.goToArticles')}
                        </Button>
                    </Col>
                    <Col xs={12} md={4}>
                        <Button
                            className='buttons lightBlue'
                            size="lg"
                            onClick={redirectToExercise}
                            data-testid="go-to-exercise-button"
                        >
                            <FaBookReader className='icon'/> {t('homepage.goToExercise')}
                        </Button>
                    </Col>
                </Row>
            </div>
            
            <FlashingText sentence={t('homepage.flashingSentence')}/>

            
        </>
    );
}

export default Landing;