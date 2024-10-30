import React, {createContext, useState} from "react";
import axios from 'axios';
import useLocalStorage from "../Hooks/useLocalStorage";

const HomeContext = createContext();
export const HomeProvider = ({children}) => {
    const initialState = [264791, 264776, 264739, 263929, 264765, 265021, 263959, 263764, 264014, 264738, 265022, 265102, 263791, 263790, 263362];
    const [isFetching, setIsFetching] = useState(false)
    const [homeArticles, setHomeArticles] = useState([])
    const url = params.ajaxurl;


    const getCarItemsById = async () => {
        return await sendCartRequest('markercontent_getCartArticles', initialState).then(({data}) => {
                setHomeArticles(data)
                setIsFetching(false)
            }
        )
    }
    const sendCartRequest = async (urlAction, data = false) => {
        setIsFetching(true)
        const action = new URLSearchParams();
        action.append('action', urlAction);
        data ? action.append('userInfo[articles_ids]', data) : ''
        return await axios.post(url, action)
    }


    return (
        <HomeContext.Provider
            value={{
                isFetching,
                homeArticles,
                getCarItemsById
            }}
        >
            {children}
        </HomeContext.Provider>
    );
};

export default HomeContext;