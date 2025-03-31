import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import "../../../styles/Articles/articleItemStyle.css"; // stylesheet
import { MdModeEdit } from "react-icons/md";
import { useTranslation } from 'react-i18next'; 
import { FaBookOpenReader } from "react-icons/fa6";

const ArticleItem = (props) => {
    const { t } = useTranslation();
    const { settings, selectThis, deleteThis, editThis, playThis } = props;

    return (
        <>
            <div className="article-item">
                <Row className="row">
                    <Col xs={12} md={10} className="col col-12 col-md-10">
                        <h2 className="wrap-title">{props.data.title}</h2>
                    </Col>
                    <Col xs={12} md={2} className="col col-12 col-md-2">
                        <p className="wrap-category">{props.data.categoryTitle}</p>
                    </Col>
                </Row>

                <div style={{ display: 'flex', gap: '10px' }}> {/* Add gap between buttons */}

                    {settings && settings.showSelectButton && (
                        <div>
                            <Button onClick={selectThis} className='buttons amber' > 
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

                    {/* Only show the Edit button if a user is logged in */}
                    {settings && settings.showEditButton && (
                        <div>
                            <Button onClick={editThis} className='buttons lightBlue'>
                                <MdModeEdit className="icons" /> {t('commonUIelements.edit')}
                            </Button>
                        </div>
                    )}

                    {settings && settings.showPlayButton && (
                        <div>
                            <Button onClick={playThis} className='buttons yellow' disabled={settings.disableSelectButton}>
                                <FaBookOpenReader className="icons" /> {t('articles.item.read')}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ArticleItem;
