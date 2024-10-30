import React, {useContext} from 'react';
import ArticleContext from "../../context/ArticleContext";
import {Link, useLocation} from 'react-router-dom';
import CategoriesItem from "../shared/CategoriesItem";
import ArticleDetails from "../shared/ArticleDetails";
import AddToCartButton from "./AddToCartButton";
import AddToProfile from "./AddToProfile";
import ImportButton from "./ImportButton";
import ButtonSecondary from "../shared/ButtonSecondary";


function ModalContent(props) {
    const {
        is_purchased,
        userSubscription,
        id,
        inCart,
        setInCart,
        purchased,
        setPurchased,
        imported,
        importable,
        setImported
    } = props

    const {ArticleState: {currentArticle}} = useContext(ArticleContext)
    const CurrentArticle = currentArticle[0]
    const {words,sanitized_rich_text, contributor: {first_name, last_name}} = CurrentArticle
    const location = useLocation();
    return (
        <div className="articleWrapper container">
            <div className="articleHeader">
                <div className="articleInfo">
                    <div className="articleCategories">
                        {CurrentArticle.categories.map((category, i) => <CategoriesItem category={category}
                                                                                        key={i}/>)}
                    </div>
                    <h3 className="articleTitle">
                        {CurrentArticle.title}
                    </h3>
                    <p className="articleAuthorWords">
                        <ArticleDetails first_name={first_name} last_name={last_name} words={words}/>
                    </p>
                </div>
                <div className="articleInteraction">
                    {!is_purchased && !userSubscription?.credits ? location.pathname !== '/cart' ?
                        <AddToCartButton id={id} inCart={inCart} setInCart={setInCart}>Add to Cart ($19)</AddToCartButton>:'': ''}
                    {userSubscription?.credits ?
                        <AddToProfile id={id} purchased={purchased} setPurchased={setPurchased}/> : ''}
                    {/*{imported !== undefined ? <ImportButton id={id} impotable={importable} setIsImport={setImported}/> : ''}*/}

                    {!userSubscription?.expire_days?<Link className={'pricingLink'} to={'/pricing'}>Subscribe (from $18)</Link>:''}
                    {is_purchased ?
                        <Link className=''
                              to={`/purchase-history`}><ButtonSecondary type={'submit'}>Purchased</ButtonSecondary>
                        </Link>
                        : ''}
                </div>
            </div>
            <div className="articleBody">
                <img src={sanitized_rich_text} alt="article"/>
            </div>
        </div>
    );
}

export default ModalContent;