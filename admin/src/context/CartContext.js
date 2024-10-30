import React, {createContext, useReducer, useState} from "react";
import axios from 'axios';
import cartReduser from "../Redux/redusers/cartReduser";
import useLocalStorage from "../Hooks/useLocalStorage";

const CartContext = createContext();
export const CartProvider = ({children}) => {
    const initialState = {
        itemsCount: 0,
        cartArticles: [],
        payResponse: true
    };
    const [isFetching, setIsFetching] = useState(false)
    const [cartState, dispatch] = useReducer(cartReduser, initialState)
    const [cart, setCart] = useLocalStorage("cart");
    const [id_session, setId] = useLocalStorage("session_id");

    const url = params.ajaxurl;


    const getCart = async () => {
        return await sendCartRequest('markercontent_getCart').then(({data: {marker_response}}) => {

            setCart(marker_response)
            const {checkOutArticleId} = marker_response
            dispatch({
                type: "UPDATE_COUNT",
                payload: checkOutArticleId.length
            })
            setIsFetching(false)
        })
    }

    const addToCart = async (articleId) => {
        return await sendCartRequest('markercontent_addToCart', articleId).then((response) => {
                getCart()
                setIsFetching(false)
            }
        )
    }


    const getCarItemsById = async () => {
        const {checkOutArticleId} = cart
        return await sendCartRequest('markercontent_getCartArticles', checkOutArticleId).then(({data}) => {
                dispatch({
                    type: "UPDATE_ARTICLES_IN_CART",
                    payload: {...data}
                })
                setIsFetching(false)
            }
        )
    }

    const removeItemFromCart = async (articleId) => {
        return await sendCartRequest('markercontent_removeArticle', articleId).then(() => {
            getCart()
            dispatch({
                type: "UPDATE_ARTICLES_IN_CART",
                payload: {...cartState.cartArticles.filter(v => v.data.id !== articleId)}
            })
            setIsFetching(false)

        })
    }

    const purchaseArticle = async (id) => {
        await getCart()
        dispatch({
            type: "UPDATE_ARTICLES_IN_CART",
            payload: {...cartState.cartArticles.filter(v => v.data.id !== id)}
        })
        setIsFetching(false)
    }


    const checkoutArticles = async () => {
        const params = {
            redirect_url: window.location.href.split("#")[0],
            page: "#/payment-result",
            cancel_url:window.location.href.split("#")[0]
        }
        return await paymentRequest('markercontent_checkoutArticles', params).then(({data}) => {
            setIsFetching(false)
            window.location.href = data.data.redirect_url
        })
    }
    const paymentComplete = async (action) => {
        dispatch({
            type: "UPDATE_PAY_RESPONSE",
            payload: false
        })
        return await sendCartRequest(action, id_session).then(({data}) => {
            setId('')
            getCart()
            dispatch({
                type: "UPDATE_PAY_RESPONSE",
                payload: true
            })
        })
    }


    const sendCartRequest = async (urlAction, data = false) => {
        setIsFetching(true)
        const action = new URLSearchParams();
        action.append('action', urlAction);
        data ? action.append('userInfo[articles_ids]', data) : ''
        return await axios.post(url, action)
    }

    const paymentRequest = async (urlAction, data) => {
        setIsFetching(true)
        const action = new URLSearchParams();
        action.append('action', urlAction);

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                action.append(key, data[key])
            }
        }
        return await axios.post(url, action)
    }


    return (
        <CartContext.Provider
            value={{
                cartState,
                isFetching,
                cart,
                id_session,
                getCart,
                addToCart,
                getCarItemsById,
                removeItemFromCart,
                checkoutArticles,
                paymentComplete,
                purchaseArticle,
                setId,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
