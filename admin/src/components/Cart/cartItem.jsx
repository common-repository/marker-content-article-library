import React, {useContext, useEffect, useState} from 'react';
import ArticleDetails from "../shared/ArticleDetails";
import {FaTrashAlt} from "react-icons/fa";
import CartContext from "../../context/CartContext";
import SearchContext from "../../context/ArticlesSearchContext";
import ReactModal from "../shared/ReactModal";
import SubscriptionsContext from "../../context/SubscriptionsContext";
import AddToProfile from "../layout/AddToProfile";

function CartItem({article}) {
    const {data:{title,categories, imported,is_purchased, words, id,contributor: {first_name, last_name}}} = article
    const {removeItemFromCart,cart}=useContext(CartContext)
    const {changeLoading} = useContext(SearchContext)
    const {subscriptionsState: {userSubscription}} = useContext(SubscriptionsContext);

    const articleInCart = Object.values(cart.checkOutArticleId).includes(id);
    const [inCart, setInCart] = useState(articleInCart)
    const [importable, setImported] = useState(false)
    const [purchased, setPurchased] = useState(is_purchased)
    useEffect(() => {
        if (imported !== undefined) {
            setImported(imported)
        }
    }, [])

    const handleRemove=()=>{
        changeLoading(30)
        removeItemFromCart(id).then(() => {
            changeLoading(100)
        })
    }

    const modalProps = {
        is_purchased,
        userSubscription,
        imported,
        id,
        inCart,
        setInCart,
        purchased,
        setPurchased,
        importable,
        setImported
    };
    return (
        <div className={'cartItem'}>
            <div className="first">
                <h3 className={'cartItemName'}>{title}</h3>
                <div className="cartItemInfo">
                    <span className="article-category">
                        {categories[0].name}
                    </span>
                    <ArticleDetails first_name={first_name} last_name={last_name} words={words} />
                </div>
            </div>
            <div className="second">
                <button className={'marker-button marker-button-secondary'} onClick={handleRemove}>
                    <FaTrashAlt size={"1rem"} />
                </button>
                <div className="cartItem-buttons-wrapper">
                    {userSubscription?.credits ?
                        <AddToProfile id={id} purchased={purchased} setPurchased={setPurchased}/> : ''}
                    <ReactModal {...modalProps}/>
                </div>
            </div>
        </div>
    );
}


export default CartItem;