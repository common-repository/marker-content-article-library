const userAccountReduser = (state, action) => {
    switch (action.type) {
        case "GET_USER_INFO":
            return {
                ...state,
                userData: action.payload,
                loading: false
            }
        case "UPDATE_USER_INFO":
            return false
        case "SET_LOADER":
            return {
                ...state,
                loading: action.payload,
            };
        case "INPUT_UPDATES":
            return {
                ...state,
                formData: action.payload,
            }
        case "SET_ERROR":
            return {
                ...state,
                errorMessage: action.payload,
            }
        case "FORM_VALUE_EMPTY":
            return {
                ...state,
                fieldEmpty: action.payload,
            }
        case "FORM_PASSWORDS_VALUE_EMPTY":
            return {
                ...state,
                passwordFormData:action.payload,
            }
        default:
            return false
    }
}

export default userAccountReduser