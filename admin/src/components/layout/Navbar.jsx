import Logo from "./Logo"
import React, {useState, useRef, useContext, useEffect, useCallback} from "react";
import {motion, AnimatePresence} from "framer-motion";
import useOnClickOutside from "../../Hooks/useStateOutsideClick"
import {Link, NavLink, useNavigate, useLocation, createSearchParams, useSearchParams} from "react-router-dom";
import AccountContext from "../../context/AccountContext";
import Search from "./search";
import Cart from "./Cart";
import TopBarPreloader from "../shared/TopbarPreloader";
import CartContext from "../../context/CartContext";
import SubscriptionsContext from "../../context/SubscriptionsContext";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    // const [prevCredits, setPrevCredits] = useState(0);
    const user = require('../../images/user.png');
    const imageRef = useRef()
    const menu = document.querySelector('.markerContent-profile')
    // const counter="7 Credits"
    const counter = false


    const {getUserSubscriptions, subscriptionsState: {userSubscription}} = useContext(SubscriptionsContext);
    useEffect(() => {
        getUserSubscriptions()
    }, []);

    ////////////redirect after payment Success
    const {setId} = useContext(CartContext)
    const navigate = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const location = useLocation();
    useEffect(() => {
        if (urlParams.get('session_id') && location.pathname === '/') {
            setId(urlParams.get('session_id'))
            const newURL = window.location.href.split("&")[0];
            window.history.pushState('object', document.title, newURL);
            navigate(
                "/payment-results"
            );
        }
    }, []);
    ///////////

    const {
        state: {userData: {profile_picture_url}}, logout
    } = useContext(AccountContext);




    const checkParent = useCallback((parent, child) => {
        return !parent.contains(child);
    }, [])

    useOnClickOutside(imageRef, (e) => {
            if (isMenuOpen && checkParent(menu, e.target)) {
                setIsMenuOpen(!isMenuOpen)
            }
        }
    )


    const handleMenuOpen = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <section className="main-wrapper">
            <TopBarPreloader/>
            <div className="navbar-wrapper container">
                <Link className={'home'} to={'/'}>
                    <Logo/>
                </Link>
                <Search/>
                {userSubscription?.subscription ?
                    <Link className={'creditsLink'} to={'/subscription'}>
                        <span className={'marker-button marker-button-secondary subs-counter'}>{userSubscription?.credits} Credits</span>
                    </Link> :
                    <Link className={'pricingLink'} to={'/pricing'}>
                        Pricing
                    </Link>}
                <Link className={'cartLink'} to={'/cart'}>
                    <Cart/>
                </Link>
                <nav className="navbar">
                    <img onClick={handleMenuOpen} ref={imageRef} className="user-logo"
                         src={profile_picture_url ? profile_picture_url : user} alt="Profile"
                         data-is-open="false" width="50" height="50" loading="lazy"/>
                    <AnimatePresence>
                        <motion.ul initial={{opacity: 0}}
                                   animate={{opacity: 1}}
                                   exit={{opacity: 0}}
                                   className={`markerContent-profile ${!isMenuOpen ? "hidden" : ""}`}>
                            <li className="menu-item settings">
                                <NavLink className={({isActive}) => (isActive ? 'active' : 'inactive')} to={'account'}>
                                    Account Settings
                                </NavLink>
                            </li>
                            <li className="menu-item settings">
                                <NavLink className={({isActive}) => (isActive ? 'active' : 'inactive')}
                                         to={'purchase-history'}>
                                    Purchase History
                                </NavLink>
                            </li>
                            <li className="menu-item log-out">
                                <Link className={({isActive}) => (isActive ? 'active' : 'inactive')}
                                      onClick={event => logout(event)} to={''}>
                                    Logout
                                </Link>
                            </li>
                        </motion.ul>
                    </AnimatePresence>
                </nav>
            </div>
        </section>
    );
}

export default Navbar;