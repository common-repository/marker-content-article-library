const cartReduser = (state, action) => {
    switch (action.type) {
        case "UPDATE_COUNT":
            return {
                ...state,
                itemsCount:action.payload,
            }
        case "UPDATE_ARTICLES_IN_CART":
            return {
                ...state,
                cartArticles: Object.values(action.payload),
            }
        case "UPDATE_PAY_RESPONSE":
            return {
                ...state,
                payResponse: action.payload,
            }
        default:
            return false
    }
}

export default cartReduser