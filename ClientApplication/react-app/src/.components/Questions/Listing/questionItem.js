import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import "../../../styles/Articles/articleItemStyle.css"; // stylesheet
import { MdModeEdit } from "react-icons/md";
import { useTranslation } from 'react-i18next';

const QuestionItem = (props) => {

    const { t } = useTranslation();
    
    const { settings, selectThis, deleteThis, editThis } = props;

    return (
        <>
            <div className="article-item"> {/* Apply the article-item class */}
                <Row className="row">
                    <Col xs={12} md={10} className="col col-12 col-md-10" style={{ marginBottom: "15px" }}>
                        <p className="wrap-text">{props.data.text}</p> {/* Apply heading and bold */}
                    </Col>
                    {/* <Col xs={12} md={2} className="col col-12 col-md-2"> */}
                    {/* <p>{props.data.categoryTitle}</p> Apply paragraph styling */}
                    {/* </Col> */}

                </Row>

                <div style={{ display: 'flex', gap: '10px' }}>
                    {settings && settings.showSelectButton && (
                        <div>
                            <Button onClick={selectThis} className='buttons amber'>
                                {t('commonUIelements.select')}
                            </Button>
                        </div>
                    )}

                    {settings && settings.showDeleteButton && (
                        <div>
                            <Button onClick={deleteThis} className='buttons red'>
                                {t('commonUIelements.delete')}
                            </Button>
                        </div>
                    )}

                    {settings && settings.showEditButton && (
                        <div>
                            <Button onClick={editThis} className='buttons lightBlue'>
                                <MdModeEdit className="icons" /> {t('commonUIelements.edit')}
                            </Button>
                        </div>
                    )}
                </div>
            </div>


        </>
    )
}

export default QuestionItem;