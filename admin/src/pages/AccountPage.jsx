import React, {useContext} from "react";
import {Route, Routes, NavLink, Link} from "react-router-dom";
import PersonalDetails from "../components/UserAccount/PersonalDetails";
import PasswordUpdate from "../components/UserAccount/PasswordUpdate";
import SubscriptionsContext from "../context/SubscriptionsContext";

function AccountPage() {
    const {subscriptionsState: {userSubscription}} = useContext(SubscriptionsContext);
    return (
        <div className="user-account container">
            <div className="account-navigation">
                <h3 className="account-settings">Account Settings</h3>
                <ul className="account-menu">
                    <li className="account-menu-item">
                        <NavLink className={({isActive}) => (isActive ? 'active' : 'inactive')} to='' end>Personal
                            details</NavLink>
                    </li>
                    <li className="account-menu-item">
                        <NavLink className={({isActive}) => (isActive ? 'active' : 'inactive')}
                                 to='password'>Password</NavLink>
                    </li>
                    {userSubscription?.subscription ? <li className="account-menu-item">
                        <Link className={'creditsLink'} to={'/subscription'}>Subscription Settings</Link>
                    </li>:''}
                </ul>
            </div>
            <Routes>
                <Route path='/' element={
                    <PersonalDetails/>
                }/>
                <Route path='/password' element={
                    <PasswordUpdate/>
                }/>
            </Routes>
        </div>
    )
}

export default AccountPage