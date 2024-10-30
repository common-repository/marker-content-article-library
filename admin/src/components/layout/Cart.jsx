import React, { useContext, useEffect} from 'react';
import {FaShoppingBag} from "react-icons/fa";
import CartContext from "../../context/CartContext";


function Cart() {
    const {getCart,cartState:{itemsCount}} = useContext(CartContext)
    useEffect(() => {
        getCart()
    }, [])
    return (
        <div className={"cartIconWrap"}>
            <span className={'cartCount'}>{itemsCount?`(${itemsCount})`:''}</span>
            <FaShoppingBag color={'black'} size={'1.5rem'}/>
        </div>
    );
}

export default Cart;