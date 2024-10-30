import React from 'react';
import User from "../layout/User";

function ArticleDetails({first_name,last_name,words}) {
    return (
        <div className="article-details">
            <User/>
            <span className="article-author">{first_name + " " + last_name + "  \u00B7" + words + " words"}</span>
        </div>
    );
}

export default ArticleDetails;