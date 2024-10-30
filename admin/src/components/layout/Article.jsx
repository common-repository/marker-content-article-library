import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom'
import ArticlesSearchContext from "../../context/ArticlesSearchContext";
import FindMach from "../shared/FindMach";
import ArticleDetails from "../shared/ArticleDetails";
import AddToCartButton from "./AddToCartButton";
import ReactModal from "../shared/ReactModal";
import ImportButton from "./ImportButton";
import SubscriptionsContext from "../../context/SubscriptionsContext";
import AddToProfile from "./AddToProfile";
import CartContext from "../../context/CartContext";
import ButtonSecondary from "../shared/ButtonSecondary";

function Article({
                     article: {
                         title,
                         categories,
                         imported,
                         words,
                         id,
                         is_purchased,
                         contributor: {first_name, last_name}
                     }
                 }) {

    let is_purchase_page = false
    const location = useLocation();
    if (location.pathname === '/purchase-history') {
        is_purchase_page = true;
    }


    const findLongestWord = (str) => {
        let longestWord = str.split(' ').reduce(function (longest, currentWord) {
            return currentWord.length > longest.length ? currentWord : longest;
        }, "");
        return longestWord.length;
    }
    const {searchState: {searchInputValue}} = useContext(ArticlesSearchContext)
    const {subscriptionsState: {userSubscription}} = useContext(SubscriptionsContext);
    const {cart} = useContext(CartContext);

    const articleInCart = Object.values(cart.checkOutArticleId).includes(id);
    const [inCart, setInCart] = useState(articleInCart)
    const [importable, setImported] = useState(false)
    const [purchased, setPurchased] = useState(is_purchased)

    useEffect(() => {
        if (imported !== undefined) {
            setImported(imported)
        }
    }, [])


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

// console.log(is_purchased, !is_purchase_page , userSubscription?.credits)
    return (
        <div className="article" id={id}>
            <div className="article-top">
               <span className="article-category">
                   {categories[0].name}
               </span>
            </div>
            <Link className='article-title'
                  to={`/articles/${id}/${title}`}>{findLongestWord(title) > 16 ? title.substring(0, 16) + '...' :
                <FindMach searchInputValue={searchInputValue} title={title}/>} </Link>
            <ArticleDetails first_name={first_name} last_name={last_name} words={words}/>
            <div className="article-buttons">

                {/*the article is not paid for, it is not a page of paid articles and the person has no credits to subscribe */}
                {is_purchased===0 && !is_purchase_page && userSubscription?.credits===0 && purchased!==true &&
                <AddToCartButton id={id} inCart={inCart} setInCart={setInCart}>Add to cart</AddToCartButton>}

                {/*the article is not paid for, it is not a page of paid articles and the person has credits to subscribe */}
                {is_purchased===0 && !is_purchase_page && userSubscription?.credits!==0 &&
                <AddToProfile id={id} purchased={purchased} setPurchased={setPurchased}/>}

                {/*only on the paid articles page does it check if the article was imported. on the other pages it is undefined*/}
                {imported!== undefined && <ImportButton id={id} impotable={importable} setIsImport={setImported}/>}

                {!is_purchase_page && <ReactModal {...modalProps}/>}

                {is_purchased!==0 && !is_purchase_page &&
                <Link className=''
                      to={`/purchase-history`}><ButtonSecondary type={'submit'}>Purchased</ButtonSecondary>
                </Link>
                }


            </div>
        </div>
    );
}

export default Article;