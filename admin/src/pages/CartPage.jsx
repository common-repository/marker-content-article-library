import React, {useContext, useEffect,useState} from 'react';
import {motion, AnimatePresence} from "framer-motion";
import CartContext from "../context/CartContext";
import SearchContext from "../context/ArticlesSearchContext";
import CartItem from "../components/Cart/cartItem";
import CartForm from "../components/Cart/cartForm";
import useLocalStorage from "../Hooks/useLocalStorage";
import CartItemsSkeleton from "../components/layout/CartItemsSkeleton";
import MyLoaderCartCheckout from "../components/layout/MyLoaderCartCheckaut";
import CartEmpty from "../components/Cart/cartEmpty";

function CartPage(props) {
    const {getCarItemsById, cartState: {cartArticles},isFetching,cart} = useContext(CartContext)
    const {changeLoading} = useContext(SearchContext)
    useEffect(() => {
        if (cart.checkOutArticleId.length) {
            changeLoading(30)
            getCarItemsById().then(() => {
                    changeLoading(100)
                }
            )
        }
    }, [])

    if(isFetching) {
        return (
            <div className={"container cart-content-wrapper"}>
                <div className="cartItemsWrapper">
                    <CartItemsSkeleton/>
                </div>
                <div className="cartFormWrapper">
                    <MyLoaderCartCheckout/>
                </div>
            </div>
        );
    }
    if (cartArticles.length) {
        return (
            <div className={"container cart-content-wrapper"}>
                <div className="cartItemsWrapper">
                    <AnimatePresence>
                        {cartArticles.map((article) => {
                            return (
                                <motion.div
                                    key={article.data.id}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                >
                                    <CartItem  article={article}/>
                                </motion.div>
                            )
                        }
                        )
                        }
                    </AnimatePresence>
                </div>
                <div className="cartFormWrapper">
                    <CartForm/>
                </div>
            </div>
        );
    }
    return (
        <CartEmpty text={'Your shopping cart is currently empty'}/>
    )

}

export default CartPage;