import React from 'react';
import {HiOutlineShoppingBag} from "react-icons/hi";
import ButtonPrimary from "../shared/ButtonPrimary";
import {Link} from 'react-router-dom'

function CartEmpty({text}) {
    return (
        <div className={'cartIsEmptyWrapper'}>
            <div className="cartIsEmpty">
                <div className={'cartEmptyIconWrapper'}>
                    <HiOutlineShoppingBag color={'black'} size={'2.5rem'}/>
                </div>
                <h3 className={'cartIsEmptyTitle'}>
                    {text}
                </h3>
                <p className={'cartIsEmptyText'}>
                    Luckily, customizable content is just a click away
                </p>
                <Link className='homePage' to={`/`}>
                    <ButtonPrimary>
                        Browse articles
                    </ButtonPrimary>
                </Link>
            </div>
        </div>
    );
}

export default CartEmpty;