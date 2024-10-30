import React, {useContext, useEffect, useState, useReducer} from "react";
import {motion, AnimatePresence} from "framer-motion";
import FormInput from "../shared/FormInput";
import Form from "../shared/Form";
import ButtonPrimary from "../shared/ButtonPrimary"
import Preloader from "../layout/Preloader";
import AccountContext from '../../context/AccountContext'


function PersonalDetails() {
    const userLogo = require('../../images/user.png');
    const {
        state: {errorMessage,userData: {profile_picture_url}, formData, loading,fieldEmpty},
        handleInputChange,
        handleSubmit,
        updateErrorMessage,
    } = useContext(AccountContext);

    useEffect(() => {
        updateErrorMessage("",true)
    }, [])

    if (loading) {
        return (
            <div className="preloaderWrapper">
                <Preloader type={'spin'} color={'#25CCBD'}/>
            </div>
        )
    } else {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="account-profile-form"
                >
                        <h3 className="personal-details">Personal details</h3>
                        <div className="img-wrapper">
                            <img className="user-logo" src={profile_picture_url ? profile_picture_url : userLogo}
                                 alt="Profile"
                                 data-is-open="false"
                                 width="50" height="50" loading="lazy"/>
                        </div>

                        <Form handleSubmit={handleSubmit}>
                            <input type="hidden" name="action" defaultValue="markercontent_update_profile"/>
                            <div className="first-last-name">
                                <FormInput
                                    label="First Name"
                                    name="userInfo[first_name]"
                                    value={formData.first_name}
                                    required="required"
                                    maxLength={40}
                                    onChange={handleInputChange}/>
                                <FormInput
                                    label="Last Name"
                                    name="userInfo[last_name]"
                                    value={formData.last_name}
                                    required="required"
                                    maxLength={40}
                                    onChange={handleInputChange}/>
                            </div>
                            <div className="email">
                                <FormInput
                                    label="Email Address"
                                    type="email"
                                    name="userInfo[email]"
                                    value={formData.email}
                                    required="required"
                                    maxLength={50}
                                    onChange={handleInputChange}/>
                            </div>
                            <ButtonPrimary type={'submit'} fieldEmpty={fieldEmpty}>Update</ButtonPrimary>
                            {errorMessage.message.length!==0 &&(
                                <span className={!errorMessage.status ? 'error':'success'}> {errorMessage.message} </span>
                            )}
                        </Form>
                </motion.div>
            </AnimatePresence>
        )
    }
}

export default PersonalDetails
