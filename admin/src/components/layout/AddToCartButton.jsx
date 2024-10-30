import React, {useContext} from 'react';
import CartContext from "../../context/CartContext";

function AddToCartButton({children,id,inCart,setInCart}) {

    const {addToCart} = useContext(CartContext)

    return inCart ?
        <span className={'articleInCart'}> In cart</span> : (
        <button
            className={`marker-button marker-button-primary`}
            onClick={() => {
                addToCart(id)
                setInCart(true)
            }}>
            {children}
        </button>
    );
}

export default AddToCartButton;