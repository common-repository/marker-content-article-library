import React, {createContext, useReducer} from "react";
import articleReduser from '../Redux/redusers/articleReduser';
import axios from 'axios';


const ArticleContext = createContext();

export const ArticleProvider = ({children}) => {
    const initialState = {
        currentArticle: {},
        articleReady:false,
    };
    const [ArticleState, dispatch] = useReducer(articleReduser, initialState)

    const url = params.ajaxurl;

    const sendAutocompleteRequest = async (searchString, actionValue) => {
        const action = new URLSearchParams();
        action.append('action', actionValue);
        action.append('userInfo[search]', searchString);
        return await axios.post(url, action)
    }


    const getArticleByID = async (articleId) => {
        setArticleReady(false)
        const {data: data} = await sendAutocompleteRequest(articleId, 'markercontent_get_search_by_id')
        const singleArticle = [data.data]
        dispatch({
            type: "UPDATE_ARTICLE",
            payload: singleArticle
        })
        setArticleReady(true)
    }

    const setArticleReady = (status)=>{
        dispatch({
            type: "UPDATE_ARTICLE_READY",
            payload: status
        })
    }
    return (
        <ArticleContext.Provider
            value={{
                ArticleState,
                getArticleByID
            }}
        >
            {children}
        </ArticleContext.Provider>
    );
};

export default ArticleContext;