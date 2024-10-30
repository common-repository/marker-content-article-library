import React from 'react';
import ContentLoader from "react-content-loader"

function MyLoaderCart(props) {
    return (
        <ContentLoader
            speed={2}
            width={870}
            height={129}
            viewBox="0 0 870 129"
            backgroundColor="#e6e6e6"
            foregroundColor="#fcfcfc"
            {...props}
        >
            <rect x="0" y="4" rx="10" ry="10" width="265" height="35" />
            <rect x="6" y="75" rx="10" ry="10" width="201" height="29" />
            <rect x="224" y="77" rx="10" ry="10" width="141" height="29" />
            <rect x="710" y="6" rx="10" ry="10" width="85" height="40" />
            <rect x="690" y="74" rx="10" ry="10" width="110" height="41" />
        </ContentLoader>
    );
}

export default MyLoaderCart;