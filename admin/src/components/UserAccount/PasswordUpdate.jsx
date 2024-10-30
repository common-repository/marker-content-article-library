import React, {useContext} from "react";
import {motion, AnimatePresence} from "framer-motion";
import FormInput from "../shared/FormInput";
import Form from "../shared/Form";
import ButtonPrimary from "../shared/ButtonPrimary"
import AccountContext from '../../context/AccountContext'
import Preloader from "../layout/Preloader";

function PasswordUpdate() {
    const user = require('../../images/user.png');
    const {
        state: {loading, errorMessage, fieldEmpty, passwordFormData: {isUnValid}},
        handlePasswordInputs,
        checkIfPasswordInputs,
        handleSubmit
    } = useContext(AccountContext);
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
                    <Form handleSubmit={handleSubmit}>
                        <input type="hidden" name="action" defaultValue="markercontent_update_profile_password"/>
                        <div className="first-last-name">
                            <FormInput
                                type="password"
                                label="Current Password"
                                name="userInfo[password]"
                                required="required"
                                minLength={6}
                                onBlur={checkIfPasswordInputs}
                                onChange={({target}) => handlePasswordInputs(target.value, "password")}
                            />

                            <FormInput
                                type="password"
                                label="New Password"
                                name="userInfo[NewPass]"
                                required="required"
                                minLength={6}
                                onBlur={checkIfPasswordInputs}
                                onChange={({target}) => handlePasswordInputs(target.value, "NewPass")}/>
                        </div>
                        <ButtonPrimary type={'submit'} fieldEmpty={isUnValid}>Update</ButtonPrimary>
                        {errorMessage.message.length !== 0 && (
                            <span className={!errorMessage.status ? 'error' : 'success'}> {errorMessage.message} </span>
                        )}

                    </Form>
                </motion.div>
            </AnimatePresence>
        )
    }
}

export default PasswordUpdate
