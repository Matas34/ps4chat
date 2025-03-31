import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import "../../styles/About/About.css";

import { useTranslation } from 'react-i18next'; 

const About = () => {

    const { t } = useTranslation();

    return (
        <>
            <div className="about-page">
                <h2>{t('aboutPage.title')}</h2>
            </div>
            <div className='mainContainer' style={{ backgroundColor: "red !important", fontSize:"20px"}}>
                <Row className='row'>
                    <Col>
                        <p>
                            {t('aboutPage.introPart1')} 
                            <text style={{color:'var(--color-purple-light)'}}> 158,464,880 </text> 
                            {t('aboutPage.introPart2')} 
                            <text style={{color:'var(--color-cyan-light)'}}> 2.2 {t('aboutPage.million')} </text> 
                            {t('aboutPage.introPart3')}
                        </p>

                        <p>
                            {t('aboutPage.toQuote')} 
                            <text style={{color:'var(--color-orange-light)'}}> {t('aboutPage.quoteAuthor')}</text>: 
                            <text style={{fontStyle:"italic", color:'var(--color-yellow-light)'}}>{' \"'}{t('aboutPage.quote')}{'\"'}</text>
                        </p>

                        <p>{t('aboutPage.teamIntroduction')}</p>

                        <p style={{marginBottom:"4px"}}>{t('aboutPage.meetTeam')}</p>

                        <p style={{paddingLeft:"15px"}}>
                            <lu>
                                <li><text style={{color:'var(--color-lime-light)'}}>Tadas</text> - {t('aboutPage.teamList.tadasDescription')}</li>
                                <li><text style={{color:'var(--color-teal-light)'}}>Darius</text> - {t('aboutPage.teamList.dariusDescription')}</li>
                                <li><text style={{color:'var(--color-purple-light)'}}>Arnas</text> - {t('aboutPage.teamList.arnasDescription')}</li>
                                <li><text style={{color:'var(--color-amber-light)'}}>Adrian</text> - {t('aboutPage.teamList.adrianDescription')}</li>
                            </lu>
                        </p>
                        <p>{t('aboutPage.conclusion')}</p>
                        <p>{t('aboutPage.happyReading')} {':3'}</p>
                    </Col>
                </Row>
            </div>
            
        </>
    );
}

export default About;