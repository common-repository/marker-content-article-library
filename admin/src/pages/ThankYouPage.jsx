import React, {useContext, useEffect} from 'react';
import CartContext from "../context/CartContext";
import {HiOutlineCheck} from "react-icons/hi";
import {NavLink} from "react-router-dom";
import ButtonPrimary from "../components/shared/ButtonPrimary";
import Preloader from "../components/layout/Preloader";
import SubscriptionsContext from "../context/SubscriptionsContext";

function ThankYouPage(props) {
    const{paymentComplete,id_session,cartState:{payResponse}}=useContext(CartContext)
    const{getUserSubscriptions}=useContext(SubscriptionsContext)

    useEffect(()=>{
        if(id_session){
            paymentComplete('markercontent_subscriptionComplete').then(
                getUserSubscriptions()
            )
        }
    },[])
    return (
        payResponse?<div className={'paymentResultsWrapper'}>
            <div className="icon-wrapper">
                <HiOutlineCheck size={"1.4rem"}/>
            </div>
            <h2 className={'paymentResultsTitle'}>Subscription successful</h2>
            <p className={'paymentResultsInfo'}>Thank you for subscribing.</p>
            <NavLink className='homePage' to={'/'}>
                <ButtonPrimary>Browse articles</ButtonPrimary>
            </NavLink>
        </div>:<div className="preloaderWrapper">
            <Preloader type={'spin'} color={'#25CCBD'}/>
        </div>
    );
}

export default ThankYouPage;