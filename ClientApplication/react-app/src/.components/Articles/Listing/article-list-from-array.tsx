import React, { useEffect, useState } from 'react';
import ArticleItem from './article-item';
import ReactPaginate from 'react-paginate';

import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons";
import "../../../styles/stylesPaginator.css"; // stylesheet
import { ArticleController } from '../../../.controllers/.MainControllersExport';
import ErrorPopup from '../../.common-components/ErrorPopup';
import { ArticleReadyForReading } from '../../../.helpers/ArticleReadyForReading';

const ArticleListFromArray = ({ settings, getSelected, update, getEditing, getPlay, articleIds }) => {
    const [articles, setArticles] = useState<any[]>([]);
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(0)

    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

    useEffect(() => {
        getArticles();
    }, [update, page, articleIds]) // [] if empty, will load for only the first and only first time

    const getArticles = async () => {
        try {
            // get only process.env.REACT_APP_PAGING_SIZE articles starting from page
            setArticles([]);
            for (let i = page *  Number(process.env.REACT_APP_PAGING_SIZE); i < articleIds.length; i++) {
                let article = await ArticleController.Get(articleIds[i]);
                article.readyForReading = await ArticleReadyForReading.isArticleReadyForReading(articleIds[i]);
                setArticles((prev) => [...prev, article]);
                if (articles.length >= Number(process.env.REACT_APP_PAGING_SIZE)) {
                    break;
                }
            }

            setPageSize(() => {
                const pagingSize = Number(process.env.REACT_APP_PAGING_SIZE) || 1;
                return Math.ceil((articles.length ?? 0) / pagingSize);
            })
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }

        
    }

    const handlePageClick = (pageIndex) => {
        setPage(pageIndex.selected)
    }

    // Function to close the error modal
    const closeErrorModal = () => {
        setShowErrorModal(false);
    };

    return (
        <>
            <div>
                {articles && articles.length > 0 ? (
                    articles.map((m, i) => (
                        <div key={i}>
                            <ArticleItem 
                            data={m} 
                            settings={{
                                ...settings,
                                disableSelectButton: !m.readyForReading
                            }}
                            selectThis={() => getSelected(m.id)}
                            editThis={() => getEditing(m.id)}
                            playThis={() => getPlay(m.id)}
                            />
                        </div>
                    ))
                ) : (
                    ""
                )}
            </div>

            <div className="d-flex justify-content-center">
                <ReactPaginate
                    previousLabel={
                        <IconContext.Provider value={{ color: "#2992a4", size: "36px" }}>
                            <AiFillLeftCircle />
                        </IconContext.Provider>
                    }
                    nextLabel={
                        <IconContext.Provider value={{ color: "#2992a4", size: "36px" }}>
                            <AiFillRightCircle />
                        </IconContext.Provider>
                    }
                    breakLabel={'...'}
                    pageCount={pageSize}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    pageClassName={"page-item"}
                    activeClassName={'active'} />
            </div>

             {/* Error Popup */}
             <ErrorPopup 
                showErrorModal={showErrorModal} 
                errorMessage={errorMessage} 
                onClose={closeErrorModal} 
            />
        </>
    )
}

export default ArticleListFromArray;