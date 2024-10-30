import React, {useContext, useState} from 'react';
import ReactPaginate from 'react-paginate';
import ArticlesSearchContext from "../../context/ArticlesSearchContext";
import {useLocation, useSearchParams} from "react-router-dom";

function Paginate({currentQueryParameters,setSearchParams}) {
    const {sendSearchRequest, searchState: {searchPaginate}} = useContext(ArticlesSearchContext)
    const {current_page, last_page, total, per_page} = searchPaginate

    const [itemOffset, setItemOffset] = useState(0);
    function getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * per_page) % total;
        setItemOffset(newOffset);

        setSearchParams({
            page: event.selected + 1,
            search: currentQueryParameters.get("search")
        });
        const searchObject = {
            'action': 'markercontent_search_results',
            'userInfo[search]': currentQueryParameters.get("search"),
            'userInfo[page]': event.selected + 1
        }
        const formData = getFormData(searchObject);
        sendSearchRequest(formData)
    };
    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                pageCount={last_page}
                previousLabel="<"
                renderOnZeroPageCount={null}
                activeClassName={'currentPage'}
                containerClassName={'paginationWrapper'}
                forcePage={current_page - 1}
            />
        </>
    );
}

export default Paginate;