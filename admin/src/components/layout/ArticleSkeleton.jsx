import React from 'react';
import MyLoader from "./MyLoader";


function ArticleSkeleton(props) {
    return (
       <>
           {
               [...Array(16)].map((x, i) =>
                   <MyLoader key={i} />
               )
           }
       </>
    );
}

export default ArticleSkeleton;