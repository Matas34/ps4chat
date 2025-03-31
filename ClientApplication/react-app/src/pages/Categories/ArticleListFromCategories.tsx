import React, { useEffect } from 'react'
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
import { useSearchParams } from 'react-router-dom';  // Import hook for query params

import { ArticleListFromArray, ReturnToCategoriesButton, ShowCategory } from '../../.components/.MainComponentsExport';

const ArticleListFromCategory = () => {
    const [categoryId, setCategoryId] = React.useState('');
    const [articleIds, setArticleIds] = React.useState([]);
    const { t } = useTranslation();

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        setCategoryId(searchParams.get('id') || '');
    }, [searchParams])


    const settings = {
        showPlayButton: true,
    }

    const receiveArticleIds = (articleIds) => {
        setArticleIds(articleIds);
    }
    
    const getPlayArticle = (articleId) => {
        navigate(`/exercise?articleId=${articleId}`);
    }

    return (
        <>


            <ReturnToCategoriesButton />
            
            <div className="category-home-page">
                <h2>Category</h2>
            </div>

            <div>
                <ShowCategory 
                    id={categoryId} 
                    sendArticleIds={receiveArticleIds} 
                    settings={settings} 
                />
            </div>
            
            <div className="category-home-page">
                <h2>Articles from category</h2>
            </div>
            
            <ArticleListFromArray
                settings={settings}
                getSelected={() => { }}
                getEditing={() => { }}
                getPlay={getPlayArticle}
                update={false}
                articleIds={articleIds}
            />
        </>

    )
}

export default ArticleListFromCategory;