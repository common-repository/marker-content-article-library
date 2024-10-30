import React, {createContext, useReducer} from "react";
import axios from 'axios';
import navBarReduser from "../Redux/redusers/navBarReduser"

const SearchContext = createContext();

export const SearchProvider = ({children}) => {
    const initialState = {
        searchInputValue: "",
        resultIsOpen: false,
        searchResultsPre: {},
        searchResultAll: [],
        searchPaginate:{},
        topLoader: 0,
        articlesIsLoaded:false
    };
    const [searchState, dispatch] = useReducer(navBarReduser, initialState)

    const url = params.ajaxurl;

    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        changeLoading(30)
        const myFormData = new FormData(e.currentTarget);
        await sendSearchRequest(myFormData).then((response) => {
            let searchUrlPath =  myFormData.get('userInfo[search]')
            window.location.href = `#/search-results/?page=${1}&search=${searchUrlPath}`
            changeLoading(100)
            }
        )

    }
    const sendSearchRequest = async (searchItem) => {
        itemsIsLoaded(false)
        await axios.post(url, searchItem).then(({data: {data,paginate}}) => {
            dispatch({
                type: "SEARCH_RESULT_UPDATE",
                payload: {data,paginate}
            })
            searchIsOpen(false)
            itemsIsLoaded(true)
        }).catch((error) => {
            console.log(error)
        })
    }

    const updateSearchResults=async ()=>{
        if (searchState.searchInputValue.length > 3) {
            const {data: {data, message}} = await sendAutocompleteRequest(searchState.searchInputValue, 'markercontent_get_search_pre')
            dispatch({
                type: "SEARCH_AUTOCOMPLETE_UPDATE",
                payload: data
            })
            searchIsOpen(true)
        } else {
            dispatch({
                type: "SEARCH_AUTOCOMPLETE_UPDATE",
                payload: {}
            })
            searchIsOpen(false)
        }
    }

    const handlePreload =  (value) => {
        dispatch({
            type: "SEARCH_INPUT_VALUE",
            payload: value
        })
    }

    const sendAutocompleteRequest = async (searchString, actionValue) => {
        const action = new URLSearchParams();
        action.append('action', actionValue);
        action.append('userInfo[search]', searchString);
        return await axios.post(url, action)
    }

    const handleAutocompleteClick = async (event) => {
        if (event.target.classList.contains('searchResultItem')) {
            dispatch({
                type: "SEARCH_INPUT_VALUE",
                payload: event.target.textContent
            })
            changeLoading(30)
            await sendAutocompleteRequest(event.target.id, 'markercontent_get_search_by_id').then(
                ({data: data})=>{
                    const singleArticle = [data.data]
                    dispatch({
                        type: "SEARCH_RESULT_SINGLE_UPDATE",
                        payload: singleArticle
                    })
                    changeLoading(100)
                    searchIsOpen(false)
                    itemsIsLoaded(true)
                    window.location.href = `#/search-results/?search=${event.target.textContent}`
                }
            )

        }
    }

    const changeLoading = (LoadStatus) => {
        dispatch({
            type: "UPDATE_LOADING",
            payload: LoadStatus
        })
    }
    const itemsIsLoaded = (LoadStatus) => {
        dispatch({
            type: "SEARCH_ARTICLE_LOADED",
            payload: LoadStatus
        })
    }
    const searchIsOpen = (resultIsOpen) => {
        dispatch({
            type: "SEARCH_RESULT_IS_OPEN",
            payload: resultIsOpen
        })
    }


    return (
        <SearchContext.Provider
            value={{
                searchState,
                dispatch,
                sendSearchRequest,
                handleSearchSubmit,
                handlePreload,
                handleAutocompleteClick,
                changeLoading,
                updateSearchResults
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export default SearchContext;