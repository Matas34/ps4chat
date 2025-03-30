import { React, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ParagraphItem from './paragraphItem';

import "../../../styles/stylesPaginator.css"; // stylesheet
import { ArticleController, ParagraphController } from '../../../.controllers/.MainControllersExport';
import ErrorPopup from '../../.common-components/ErrorPopup';

import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons";
import ReactPaginate from 'react-paginate';

import DeletePopup from '../../.common-components/DeletePopup';

const listOfParagraphs = ({ articleId, getSelected, update, settings }) => {
    const [paragraphs, setParagraphs] = useState(null)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(0)

    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState("");
    const [deleteId, setDeleteId] = useState(null);


    useEffect(() => {
        // get all tests
        getParagraphs();
    }, [page, update]) // [] if empty, will load for only the first and only first time

    const getParagraphs = async () => {
        const maxPageSize = process.env.REACT_APP_PAGING_SIZE;
        let allArticleParagraphs = [];
        try {
            let article = await ArticleController.Get(articleId);
            allArticleParagraphs = article.paragraphIDs;
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
            return;
        }


        setPageSize(() => {
            return Math.ceil(allArticleParagraphs.length / maxPageSize)
        })

        // leave only specified number of questions
        allArticleParagraphs = allArticleParagraphs.slice(page * maxPageSize, page * maxPageSize + maxPageSize);

        // get each paragraph individually
        try {
            let paragraphs = await Promise.all(allArticleParagraphs.map(async (paragraphId) => {
                return await ParagraphController.Get(paragraphId);
            }));
            setParagraphs(paragraphs);
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

    const getDeleting = async () => {
        try {
            await ParagraphController.Delete(deleteId);
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }

        getParagraphs();
        setShowDeletePopup(false);
    }

    const cancelDelete = () => {
        setShowDeletePopup(false);
    }

    const Delete = (id) => {
        setShowDeletePopup(true);
        setDeleteMessage("Are you sure you want to delete this paragraph?");
        setDeleteId(id);
    }

    return (
        <>
            <div>
                {paragraphs && paragraphs.length > 0 ? (
                    paragraphs.map((m, i) => (
                        <div key={i}>
                            <ParagraphItem
                                data={m}
                                selectThis={() => getSelected(m.id)}
                                deleteThis={() => Delete(m.id)}
                                settings={settings}
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
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>

            {/* Error Popup */}
            <ErrorPopup
                errorMessage={errorMessage}
                show={showErrorModal}
                handleClose={closeErrorModal}
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

export default listOfParagraphs;