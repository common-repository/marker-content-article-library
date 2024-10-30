import React from 'react';
import MyLoaderCart from "./MyLoaderCart";

function CartItemsSkeleton(props) {
    return (
        <>
            {
                [...Array(3)].map((x, i) =>
                    <MyLoaderCart key={i} />
                )
            }
        </>
    );
}

export default CartItemsSkeleton;