import React, {useContext,useEffect} from 'react';
import Form from "../shared/Form";
import {FaSearch} from "react-icons/fa";
import ArticlesSearchContext from "../../context/ArticlesSearchContext";
import Autocomplete from "./autocomplete"
import useDebounce from "../../Hooks/useDebounce";

function Search(props) {
    const {
        searchState: { resultIsOpen, searchInputValue},
        dispatch,
        handleSearchSubmit,
        handlePreload,
        updateSearchResults
    } = useContext(ArticlesSearchContext)


    const FocusToggle = () => {
        dispatch({
            type: "SEARCH_RESULT_IS_OPEN",
            payload: !resultIsOpen
        })
    }
    const debouncedSearchTerm = useDebounce(searchInputValue, 500);

    useEffect(
        () => {
            updateSearchResults()
        },
        [debouncedSearchTerm] // Only call effect if debounced search term changes
    )


    return (
        <div className="searchWrapper">
            <Form handleSubmit={handleSearchSubmit} customClass={''}>
                <input type="hidden" name="action" defaultValue="markercontent_search_results"/>
                <div className="search-icon-wrapper search-icon-wrapper__left">
                    <FaSearch className='search-icon'/>
                </div>
                <input onChange={(e) => handlePreload(e.target.value)} onFocus={FocusToggle} value={searchInputValue} type="text"
                       className='search-input' name="userInfo[search]"
                       placeholder='Search articles' autoComplete="off"/>
                <div className="search-icon-wrapper search-icon-wrapper__right">
                    <FaSearch className='search-icon'/>
                </div>
            </Form>

            <Autocomplete/>

        </div>
    );
}


export default Search;