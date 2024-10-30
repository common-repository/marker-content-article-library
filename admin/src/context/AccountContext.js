import React, {createContext, useReducer} from "react";
import axios from 'axios';
import userAccountReduser from '../Redux/redusers/userAccountReduser';


const AccountContext = createContext();

export const AccountProvider = ({children}) => {
    const initialState = {
        userData: {},
        loading: true,
        errorMessage: {
            status: true,
            message: ""
        },
        fieldEmpty: false,
        formData: {
            first_name: '',
            last_name: '',
            email: ''
        },
        passwordFormData: {
            password: '',
            NewPass: '',
            isUnValid: true
        }
    };
    const [state, dispatch] = useReducer(userAccountReduser, initialState)

    const url = params.ajaxurl;

    //update ueser info
    const handleSubmit = async (e) => {
        updatePreloader(true)
        e.preventDefault()
        const myFormData = new FormData(e.currentTarget);
        await axios.post(url, myFormData).then(({data}) => {
            updateFormDataAndUser(data)
            updateErrorMessage(data.message, data.success)
        }).catch((error) => {
            const {data} = error.response
            updateErrorMessage(data.message, data.success)
            updatePreloader(false)
        })
    }

    const fetchUserInfo = async () => {
        const action = new URLSearchParams();
        action.append('action', 'markercontent_get_user_info');
        const {data} = await axios.post(url, action)
        updateFormDataAndUser(data)
    }

    const handlePasswordInputs = (pass, target) => {
        dispatch({
            type: "FORM_PASSWORDS_VALUE_EMPTY",
            payload: {
                ...state.passwordFormData,
                [target]: pass
            }
        })
    }

    const checkIfPasswordInputs = () => {
        if (state.passwordFormData.password.length >= 6 && state.passwordFormData.NewPass.length >= 6) {
            updateErrorMessage("", true)
            dispatch({
                type: "FORM_PASSWORDS_VALUE_EMPTY", payload: {...state.passwordFormData, isUnValid: false}
            })
        } else {
            updateErrorMessage("Password must include at least 6 characters", false)
            dispatch({
                type: "FORM_PASSWORDS_VALUE_EMPTY", payload: {...state.passwordFormData, isUnValid: true}
            })
        }
    }

    const logout = async (e) => {
        e.preventDefault()
        await sendCartRequest('markercontent_user_logout').then(() => {
                window.location.reload(false)
            }
        )
    }

    const handleInputChange = (event) => {
        let {name, value} = event.target;
        name = name.match('\\[(.*?)\\]')[1]
        if (!value.length) {
            dispatch({
                type: "FORM_VALUE_EMPTY",
                payload: true
            })
        } else {
            dispatch({
                type: "FORM_VALUE_EMPTY",
                payload: false
            })
        }

        const updatedForm = {
            ...state.formData,
            [name]: value
        };


        dispatch({
            type: "INPUT_UPDATES",
            payload: updatedForm
        })
    };

    const updateFormDataAndUser = (values) => {
        const {data} = values;
        const newFormdata = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email
        }
        dispatch({
            type: "GET_USER_INFO",
            payload: data,
        });

        dispatch({
            type: "INPUT_UPDATES",
            payload: newFormdata,
        });
    }

    const updatePreloader = (status) => {
        dispatch({
            type: "SET_LOADER",
            payload: status
        });
    }

    const updateErrorMessage = (message, ok) => {
        dispatch({
            type: "SET_ERROR",
            payload: {
                status: ok,
                message
            }
        });
    }


    const sendCartRequest = async (urlAction, data = false) => {
        const action = new URLSearchParams();
        action.append('action', urlAction);
        data ? action.append('userInfo[articles_ids]', data) : ''
        return await axios.post(url, action)
    }


    return (
        <AccountContext.Provider
            value={{
                state,
                logout,
                handleInputChange,
                handleSubmit,
                fetchUserInfo,
                handlePasswordInputs,
                updateErrorMessage,
                checkIfPasswordInputs
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountContext;
