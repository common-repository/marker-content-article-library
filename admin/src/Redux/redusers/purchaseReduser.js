const purchaseReduser = (state, action) => {
    switch (action.type) {
        case "IS_FETCHING":
            return {
                ...state,
                isFetching:action.payload,
            }
        case "PURCHASE_UPDATE":
            return {
                ...state,
                purchaseArticles:action.payload,
            }
        default:
            return false
    }
}


export default purchaseReduser