const userAccountReduser = (state, action) => {
    switch (action.type) {
        case "GET_SUBSCRIPTIONS":
            return {
                ...state,
                subscriptionTypes: action.payload,
            }
        case "GET_USER_SUBSCRIPTION":
            return {
                ...state,
                userSubscription: action.payload,
            }
        case "IS_FETCHING":
            return {
                ...state,
                isFetching: action.payload,
            }
        default:
            return false
    }
}

export default userAccountReduser