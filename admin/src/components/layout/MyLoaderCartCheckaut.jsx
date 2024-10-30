import React from 'react';
import ContentLoader from "react-content-loader"

function MyLoaderCartCheckout(props) {
    return (
        <ContentLoader
            speed={2}
            width={354}
            height={160}
            viewBox="0 0 354 160"
            backgroundColor="#e6e6e6"
            foregroundColor="#fcfcfc"
            {...props}
        >
            <rect x="-2" y="11" rx="10" ry="10" width="265" height="28" />
            <rect x="3" y="54" rx="10" ry="10" width="302" height="24" />
            <rect x="3" y="98" rx="10" ry="10" width="325" height="38" />
        </ContentLoader>
    );
}

export default MyLoaderCartCheckout;