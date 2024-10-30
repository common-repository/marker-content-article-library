import React, {useContext, useEffect} from 'react';
import {NavLink} from "react-router-dom"
import {HiOutlineCheck} from "react-icons/hi";
import CartContext from "../context/CartContext";
import ButtonPrimary from "../components/shared/ButtonPrimary";
import Preloader from "../components/layout/Preloader";

function PaymentResults(props) {
    const{paymentComplete,id_session,cartState:{payResponse}}=useContext(CartContext)

    useEffect(()=>{
        if(id_session.length){
            paymentComplete('markercontent_paymentComplete')
        }
    },[])
    return (
        payResponse?<div className={'paymentResultsWrapper'}>
            <div className="icon-wrapper">
                <HiOutlineCheck size={"1.4rem"}/>
            </div>
            <h2 className={'paymentResultsTitle'}>Payment successful</h2>
            <p className={'paymentResultsInfo'}>Thank you for your purchase.</p>
            <NavLink className='homePage' to={'/purchase-history'}>
                <ButtonPrimary>Purchase history</ButtonPrimary>
            </NavLink>
        </div>:<div className="preloaderWrapper">
        <Preloader type={'spin'} color={'#25CCBD'}/>
    </div>
    );
}

export default PaymentResults;