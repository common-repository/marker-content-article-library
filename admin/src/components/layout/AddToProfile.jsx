import React, {useContext} from 'react';
import SubscriptionsContext from "../../context/SubscriptionsContext";
import CartContext from "../../context/CartContext";

function AddToProfile({id,purchased,setPurchased}) {
    const {redeemArticle,getUserSubscriptions} = useContext(SubscriptionsContext)
    const {purchaseArticle} = useContext(CartContext)
     const purchasedHandler=()=>{
         setPurchased(true)
         redeemArticle(id).then(()=>{
             purchaseArticle(id)
             getUserSubscriptions()
         })
     }

    return purchased ?
        <span className={'articleInCart'}> purchased </span> : (
            <button
                className={`marker-button marker-button-primary`}
                onClick={() => {
                    purchasedHandler()
                }}>
                Redeem
            </button>
        );
}

export default AddToProfile;