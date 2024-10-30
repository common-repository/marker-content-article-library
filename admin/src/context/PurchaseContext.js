import React, {createContext, useReducer} from "react";
import axios from 'axios';
import purchaseReduser from "../Redux/redusers/purchaseReduser";

const PurchaseContext = createContext();
export const PurchaseProvider = ({children}) => {
    const initialState = {
        isFetching: true,
        purchaseArticles: [],
    };
    const [purchaseState, dispatch] = useReducer(purchaseReduser, initialState)

    const url = params.ajaxurl;


    const getPurchaseHistory = async () => {
        return await sendPurchaseRequest('markercontent_getPurchase').then(({data: data}) => {
            delete data.marker_response.total
            dispatch({
                type: 'PURCHASE_UPDATE',
                payload:Object.values(data.marker_response)
            })
            setIsFetching(false)
        })
    }

    const importArticle = async (id)=>{
        return await sendPurchaseRequest('markercontent_importArticle',id).then(({data: data}) => {
            delete data.marker_response.total
            dispatch({
                type: 'PURCHASE_UPDATE',
                payload:Object.values(data.marker_response)
            })
            setIsFetching(false)
        })
    }

    const sendPurchaseRequest = async (urlAction, data = false) => {
        setIsFetching(true)
        const action = new URLSearchParams();
        action.append('action', urlAction);
        data ? action.append('userInfo[purchaseData]', data) : ''
        return await axios.post(url, action)
    }
    const setIsFetching = (param) => {
        dispatch({
            type: "IS_FETCHING",
            payload: param
        })
    }


    return (
        <PurchaseContext.Provider
            value={{
                purchaseState,
                importArticle,
                getPurchaseHistory
            }}
        >
            {children}
        </PurchaseContext.Provider>
    );
};

export default PurchaseContext;
