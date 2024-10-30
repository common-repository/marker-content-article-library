const articleReduser = (state, action) => {
    switch (action.type) {
        case "UPDATE_ARTICLE":
            return {
                ...state,
                currentArticle:action.payload,
            }
        case "UPDATE_ARTICLE_READY":
            return {
                ...state,
                articleReady:action.payload,
            }
        default:
            return false
    }
}


export default articleReduser