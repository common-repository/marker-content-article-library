import React, {useContext, useEffect} from 'react';
import CartContext from "../context/CartContext";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

function Page404()
{
    const {setId} = useContext(CartContext)
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get("session_id")) {
            setId(searchParams.get('session_id'))
            const newURL = window.location.href.split("#")[0];
            window.history.pushState('object', document.title, newURL);
            navigate(
                "/thank-you"
            );
        }
    }, []);


    return (
            <div className="page-content container">
                <div className="not-found-wrapper">
                    <h2 className="not-found-text"> 404 </h2>
                    <h2 className="not-found-text"> NOT FOUND </h2>
                </div>
            </div>
    );
}

export default Page404;