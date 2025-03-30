import React, { useEffect, useState } from 'react';
import ArticleItem from './article-item';
import ReactPaginate from 'react-paginate';

import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons";
import "../../../styles/stylesPaginator.css"; // stylesheet
import { ArticleController } from '../../../.controllers/.MainControllersExport';
import ErrorPopup from '../../.common-components/ErrorPopup';
import { ThreeDots } from 'react-loader-spinner';
import DeletePopup from '../../.common-components/DeletePopup';
import { useTranslation } from 'react-i18next'; 
import { FaSearch } from "react-icons/fa";
import { ArticleReadyForReading } from '../../../.helpers/ArticleReadyForReading';


const ArticleList = ({ settings, getSelected, update, getEditing, getPlay, userId }) => {
    const { t } = useTranslation();
   
    const [articles, setArticles] = useState(null)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(0)

    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState("");
    const [deleteId, setDeleteId] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (userId === null) {
            return;
        }
        getArticles();
    }, [update, userId]) // [] if empty, will load for only the first and only first time

    useEffect(() => {
        getArticles();
    }, [page, searchTerm]) // [] if empty, will load for only the first and only first time

    const getArticles = async () => {
        try {
            let articlePage
            if (userId === -1) {
                return;
            }
            if (searchTerm === "" || !settings.showSearchBar) {
                articlePage = await ArticleController.GetPage(page + 1, userId);
            } else {
                articlePage = await ArticleController.Page(page + 1, userId, searchTerm);
            }

            // check which articles are ready for reading
            let newArticles = await Promise.all(articlePage.articles.map(async article => {
                article.readyForReading = await ArticleReadyForReading.isArticleReadyForReading(article.id);
                return article;
            }));

            // console.log(newArticles);


            setArticles(newArticles)
            setPageSize(() => {
                return Math.ceil(articlePage.count / process.env.REACT_APP_PAGING_SIZE)
            })
        } catch (error) {
            // throw error;
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

    const getDeleting = async () => {
        try {
            await ArticleController.Delete(deleteId);
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }

        getArticles();
        setShowDeletePopup(false);
    }

    const cancelDelete = () => {
        setShowDeletePopup(false);
    }

    const Delete = (id) => {
        setShowDeletePopup(true);
        setDeleteMessage("Are you sure you want to delete this article?");
        setDeleteId(id);
    }



    return (
        <>
{settings && settings.showSearchBar && (
    <div className="search-bar-container">
        <div className="icon-box">
            <FaSearch />
        </div>
        <input
            type="text"
            className="form-control darkInput"
            placeholder={t('searchArticle')}
            onChange={(e) => {
                const searchTerm = e.target.value;
                setSearchTerm(searchTerm);
            }}
        />
    </div>
)}



            <div>
                {articles && articles.length > 0 ? (
                    articles.map((m, i) => (
                        <div key={i}>
                            {/* {console.log(m.readyForReading + " " + m.id)} */}
                            <ArticleItem
                                data={m}
                                settings={{
                                    ...settings,
                                    disableSelectButton: !m.readyForReading
                                }}
                                selectThis={() => getSelected(m.id)}
                                editThis={() => getEditing(m.id)}
                                playThis={() => getPlay(m.id)}
                                deleteThis={() => Delete(m.id)}
                            />
                        </div>
                    ))
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <ThreeDots
                            height="50"
                            width="50"
                            radius="9"
                            color="white"
                            ariaLabel="three-dots-loading"
                            visible={true}
                        />
                    </div>
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

            <DeletePopup
                showDeleteModal={showDeletePopup}
                message={deleteMessage}
                onClose={cancelDelete}
                onDelete={getDeleting}

            />
        </>
    )
}

export default ArticleList;