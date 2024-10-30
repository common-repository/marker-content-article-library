import React, {useContext, useRef} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import SearchResultItem from "./SearchResultItem";
import ArticlesSearchContext from "../../context/ArticlesSearchContext";
import useOnClickOutside from "../../Hooks/useStateOutsideClick"


function Autocomplete() {
    const {searchState: {searchResultsPre, resultIsOpen}, handleAutocompleteClick,dispatch} = useContext(ArticlesSearchContext)
    const autocompleteRef = useRef()

    function checkParent(parent, child) {
        return !parent.current.contains(child);
    }

    useOnClickOutside(autocompleteRef, (e) => {
        if (resultIsOpen && checkParent(autocompleteRef, e.target)) {
            FocusToggle()
        }
    })

    const searchIsEmpty = (searchState) => {
        for (var i in searchState) return false;
        return true
    }
    const FocusToggle = () => {
        dispatch({
            type: "SEARCH_RESULT_IS_OPEN",
            payload: !resultIsOpen
        })
    }
    return (
        <AnimatePresence>
            <motion.div
                className={resultIsOpen && !searchIsEmpty(searchResultsPre) && "autocomplete-list"}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                onClick={handleAutocompleteClick}
                ref={autocompleteRef}
            >
                {resultIsOpen && !searchIsEmpty(searchResultsPre) &&
                Object.keys(searchResultsPre).map((item) => {
                        const searchItem = {};
                        searchItem['title'] = searchResultsPre[item]
                        searchItem['id'] = item
                        return (<SearchResultItem key={item} item={searchItem}/>)
                    }
                )
                }
            </motion.div>
        </AnimatePresence>
    );
}

export default Autocomplete;