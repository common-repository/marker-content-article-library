import React, {useEffect, useContext, useState} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom'
import ArticleContext from "../context/ArticleContext";
import Preloader from "../components/layout/Preloader";
import CategoriesItem from "../components/shared/CategoriesItem";
import ArticleDetails from "../components/shared/ArticleDetails";
import ButtonSecondary from "../components/shared/ButtonSecondary";
import AddToCartButton from "../components/layout/AddToCartButton";
import SubscriptionsContext from "../context/SubscriptionsContext";
import AddToProfile from "../components/layout/AddToProfile";
import CartContext from "../context/CartContext";

function ArticlePage(props) {
    const {ArticleState: {currentArticle, articleReady},setArticleReady, getArticleByID} = useContext(ArticleContext)
    const { subscriptionsState: {userSubscription}} = useContext(SubscriptionsContext);
    const {cart} = useContext(CartContext);


    const navigate = useNavigate();
    const params = useParams()

    // const {words,sanitized_rich_text,is_purchased,id, contributor: {first_name, last_name}} = CurrentArticle
    const articleInCart = cart?.checkOutArticleId?Object.values(cart?.checkOutArticleId).includes(currentArticle[0]?.id):false;
    const [inCart, setInCart] = useState(articleInCart)
    const [purchased, setPurchased] = useState(currentArticle[0]?.is_purchased)

    useEffect(() => {
        getArticleByID(params.id)
    }, [])

    useEffect(() => {
        const articleInCart = cart?.checkOutArticleId?Object.values(cart?.checkOutArticleId).includes(currentArticle[0]?.id):false;
        setInCart(articleInCart)
        setPurchased(currentArticle[0]?.is_purchased)
    }, [currentArticle])

    if (articleReady) {

        function back() {
            navigate(-1)
        }

        return (
                <div className="articleWrapper container">
                    <div className="articleHeader">
                        <div className="articleInfo">
                            <div className="articleCategories">
                                {currentArticle[0]?.categories.map((category, i) => <CategoriesItem category={category}
                                                                                                key={i}/>)}
                            </div>
                            <h3 className="articleTitle">
                                {currentArticle[0]?.title}
                            </h3>
                            <p className="articleAuthorWords">
                                <ArticleDetails first_name={currentArticle[0]?.first_name} last_name={currentArticle[0]?.last_name} words={currentArticle[0]?.words}/>
                            </p>
                        </div>
                        <div className="articleInteraction">
                            <ButtonSecondary handleClick={back} type={''}>Back to list</ButtonSecondary>
                            {!currentArticle[0]?.is_purchased && !userSubscription?.credits?<AddToCartButton id={currentArticle[0]?.id} inCart={inCart} setInCart={setInCart}>Add to Cart ($19)</AddToCartButton>:''}
                            {!currentArticle[0]?.is_purchased ? userSubscription?.credits ?
                                <AddToProfile id={currentArticle[0]?.id} purchased={purchased} setPurchased={setPurchased}/> : '':''}
                            {!userSubscription?.expire_days?<Link className={'pricingLink'} to={'/pricing'}>Subscribe (from $18)</Link>:''}
                            {currentArticle[0]?.is_purchased ?
                                <Link className='purchased-link'
                                      to={`/purchase-history`}><ButtonSecondary type={'submit'}>Purchased</ButtonSecondary>
                                </Link>
                                : ''}

                        </div>
                    </div>
                    <div className="articleBody">
                        <img src={currentArticle[0]?.sanitized_rich_text} alt="article"/>
                    </div>
                </div>
        );
    } else {
        return (
            <div className="preloaderWrapper">
                <Preloader type={'spin'} color={'#25CCBD'}/>
            </div>
        )
    }
}

export default ArticlePage;