const navBarReduser = (state, action) => {
    switch (action.type) {

        case "SEARCH_RESULT_SINGLE_UPDATE":
            return {
                ...state,
                searchResultAll:action.payload,
            }
        case "SEARCH_RESULT_UPDATE":
            return {
                ...state,
                searchResultAll:action.payload.data,
                searchPaginate:action.payload.paginate
            }

        case "SEARCH_AUTOCOMPLETE_UPDATE":
            return {
                ...state,
                searchResultsPre:action.payload,
            }
        case "SEARCH_RESULT_IS_OPEN":
            return {
                ...state,
                resultIsOpen:action.payload,
            }
        case "SEARCH_INPUT_VALUE":
            return {
                ...state,
                searchInputValue:action.payload,
            }
        case "UPDATE_LOADING":
            return {
                ...state,
                topLoader:action.payload,
            }
        case "SEARCH_ARTICLE_LOADED":
            return {
                ...state,
                articlesIsLoaded:action.payload,
            }
        default:
            return false
    }
}


export default navBarReduser