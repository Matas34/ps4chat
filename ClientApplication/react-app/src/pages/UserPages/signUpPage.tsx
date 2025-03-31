import React from 'react';
import '../../styles/Articles/createArticleStyle.css';
import { SignUp} from '../../.components/.MainComponentsExport';
import { Row, Col } from 'react-bootstrap';

import { useTranslation } from 'react-i18next'; 

const SignUpPage = () => {

    const { t } = useTranslation();

    return (
        <>
            <div className="category-home-page">
                <h2>{t('signup.signUp')}</h2> 
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important", borderStyle:"dashed", borderWidth:"thick", borderColor:"var(--color-pink-dark)"}}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        <SignUp/>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default SignUpPage;