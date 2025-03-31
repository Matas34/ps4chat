import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import "../../../styles/Articles/articleItemStyle.css"; // stylesheet
import { MdModeEdit } from "react-icons/md";

import { useTranslation } from 'react-i18next';

const ParagraphItem = (props) => {

    const { t } = useTranslation();

    const { settings, selectThis, deleteThis, editThis } = props;
    return (
        <>
            <div className="article-item"> {/* Apply the article-item class */}
                <Row className="row">
                    <Col xs={12} md={10} className="col col-12 col-md-10">
                        <h2 className="wrap-title">{props.data.title}</h2> {/* Apply heading and bold */}
                    </Col>
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

export default ParagraphItem;

