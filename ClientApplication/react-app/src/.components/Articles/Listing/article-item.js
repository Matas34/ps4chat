import React, {useEffect, useState} from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import "../../../styles/Articles/articleItemStyle.css"; // stylesheet
import { MdModeEdit } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { FaBookOpenReader } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {UserManager} from "../../../.controllers/.dataProcessingHelpers/DataProccessingHelpersExport";
const ArticleItem = (props) => {
    const { t } = useTranslation();
    const { settings, selectThis, deleteThis, editThis, playThis } = props;
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        const fetchLikedArticles = async () => {
            const user = UserManager.getUser();

            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}Users/LikedArticles?userId=${user._id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${user._token}`,
                        },
                        credentials: 'include'
                    }
                );

                if (response.ok) {
                    const likedArticles = await response.json();
                    setIsLiked(likedArticles.includes(props.data.id));
                }
            } catch (error) {
                console.error("Failed to fetch liked articles:", error);
            }

            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}Articles/usersWhoLikedTheArticle?articleId=${props.data.id}`,
                    {
                        credentials: 'include'
                    }
                );

                if (response.ok) {
                    const userWhoLiked = await response.json();
                    setLikeCount(userWhoLiked.length);
                }
            } catch (error) {
                console.error("Failed to fetch user who liked the article:", error);
            }
        };

        fetchLikedArticles()
    }, [props.data.id]);

    const handleLikeClick = async () => {
        const user = UserManager.getUser();
        
        if(user === null){
            return;
        }
        
        if(isLiked === false) {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}Users/ThumbsUp?userId=${user._id}&articleId=${props.data.id}`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${user._token}`,
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include'
                    }
                );

                if (response.ok){
                    setIsLiked(!isLiked);
                    setLikeCount(likeCount => likeCount + 1);
                }
            }
            catch(error) {
                console.error(error);
            }
        }
        else{
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}Users/ThumbsDown?userId=${user._id}&articleId=${props.data.id}`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${user._token}`,
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include'
                    }
                );

                if (response.ok){
                    setIsLiked(!isLiked);
                    setLikeCount(likeCount => likeCount - 1);
                }
            }
            catch(error) {
                console.error(error);
            }
        }
    };

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

                    {settings && settings.showPlayButton && (
                        <div>
                            <Button onClick={handleLikeClick} className='buttons red'
                                    disabled={settings?.disableSelectButton}>
                                {isLiked ? <FaHeart className="icons solid-heart"/> :
                                    <FaRegHeart className="icons outline-heart"/>}
                                <span style={{
                                    position: 'relative',
                                    left: '3px',
                                    top: '8px',
                                    fontSize: '13px',
                                    color: 'white'
                                    }}>
                                    {likeCount}
                                </span>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ArticleItem;
