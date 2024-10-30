import React, {useContext} from 'react';
import CartContext from "../../context/CartContext";
import {Link ,NavLink} from "react-router-dom";
import SubscriptionsContext from "../../context/SubscriptionsContext";
import ButtonSecondary from "../shared/ButtonSecondary";
import SearchContext from "../../context/ArticlesSearchContext";

function CartForm(props) {
    const {checkoutArticles,cart} = useContext(CartContext)
    const {billingInfo} = useContext(SubscriptionsContext)
    const {changeLoading} = useContext(SearchContext)

    const billingHandler = ()=>{
        changeLoading(30)
        billingInfo()
    }
    const {subscriptionsState: {userSubscription}} = useContext(SubscriptionsContext);
    return (
        <div>
            <div className={"orderTop"}>
                <p className="cartTitle">
                    Order summary
                </p>
            </div>
            <div className={"orderInfo"}>
                <span>
                    Order total (Excl. tax)
                </span>
                <span>
                    ${cart.total_amount}
                </span>
            </div>
            <button className={'marker-button marker-button-primary'} onClick={checkoutArticles}>
                Continue to checkout
            </button>
            {!userSubscription?.credits && userSubscription?.expire_days? <Link className={'pricingLink'} onClick={billingHandler}>Upgrade subscription</Link>:''}
            {!userSubscription?.expire_days?<Link className={'pricingLink'} to={'/pricing'}>Subscribe (from $18)</Link>:''}
            <NavLink className='homePage' to={'/'}>
                <ButtonSecondary>Continue shopping</ButtonSecondary>
            </NavLink>

        </div>
    );
}

export default CartForm;