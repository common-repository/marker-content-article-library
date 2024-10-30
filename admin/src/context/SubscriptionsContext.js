import React, {createContext, useReducer,useState} from "react";
import axios from 'axios';
import userAccountReduser from "../Redux/redusers/subscriptionsReduser";

const SubscriptionsContext = createContext();
export const SubscriptionsProvider = ({children}) => {
    const initialState = {
        subscriptionTypes: [],
        userSubscription:{},
        isFetching:false
    };
    const [subscriptionsState, dispatch] = useReducer(userAccountReduser, initialState)

    const url = params.ajaxurl;


    const getSubscriptions = async () => {
        return await sendSubscriptionsRequest('markercontent_getSubscriptions').then(({data: data}) => {
            dispatch({
                type: 'GET_SUBSCRIPTIONS',
                payload:Object.values(data.marker_response)
            })
            setIsFetching(false)
        })
    }

    const redeemArticle = async (id)=>{
        const params = {
            article: id
        }

        return await paymentRequest('markercontent_redeemArticle',params).then(({data: data}) => {
            setIsFetching(false)
        })
    }


    const getSubscriptionRedirectUrl = async (id)=>{
        const params = {
            redirect_url: window.location.href.split("#")[0].concat('#/pricing'),
            page: "/complete",
            price_id: id,
            cancel_url:window.location.href.split("#")[0]
        }
        return await paymentRequest('markercontent_checkout_subscription', params).then(({data:{marker_response}}) => {
            window.location.href = marker_response.redirect_url
        })
    }




    const getUserSubscriptions = async ()=>{
        return await sendSubscriptionsRequest('markercontent_authUserSubscriptions').then(({data: data}) => {
            dispatch({
                type: 'GET_USER_SUBSCRIPTION',
                payload:data.marker_response
            })

        })
    }

    const billingInfo = async ()=>{
        const params = {
            cancel_url:window.location.href.split("#")[0]
        }

        return await paymentRequest('markercontent_billingInfo',params).then(({data:{marker_response}}) => {
            window.location.href = marker_response.billing_info_url
        })
    }

    const sendSubscriptionsRequest = async (urlAction, data = false) => {
        setIsFetching(true)
        const action = new URLSearchParams();
        action.append('action', urlAction);
        data ? action.append('userInfo[subscription]', data) : ''
        return await axios.post(url, action)
    }

    const setIsFetching = (param) => {
        dispatch({
            type: "IS_FETCHING",
            payload: param
        })
    }

    const paymentRequest= async (urlAction, data ) => {
        setIsFetching(true)
        const action = new URLSearchParams();
        action.append('action', urlAction);

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                action.append(key, data[key])
            }
        }
        return  await axios.post(url, action)
    }


    return (
        <SubscriptionsContext.Provider
            value={{
                subscriptionsState,
                getSubscriptions,
                setIsFetching,
                getUserSubscriptions,
                getSubscriptionRedirectUrl,
                redeemArticle,
                billingInfo
            }}
        >
            {children}
        </SubscriptionsContext.Provider>
    );
};

export default SubscriptionsContext;