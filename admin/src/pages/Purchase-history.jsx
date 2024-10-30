import React, {useContext, useEffect} from 'react';
import PurchaseContext from "../context/PurchaseContext";
import Article from "../components/layout/Article";
import ArticleSkeleton from "../components/layout/ArticleSkeleton";
import CartEmpty from "../components/Cart/cartEmpty";

function PurchaseHistory(props) {

    const {getPurchaseHistory,purchaseState:{isFetching,purchaseArticles}}=useContext(PurchaseContext)

    useEffect(()=>{
        getPurchaseHistory()
    },[])
    if( purchaseArticles.length) {
        return (
            <div className="page-content container">
                <div className="articles-wrapper">
                    {
                        !isFetching ? purchaseArticles.map((item) => {
                                return (<Article key={item.id} article={item}/>)
                            }
                        ) : <ArticleSkeleton/>
                    }
                </div>
            </div>
        );
    }else {
        return (
            <CartEmpty text={'Sad times, you have no purchases yet. Let\'s change that!'}/>
        );
    }
}

export default PurchaseHistory;