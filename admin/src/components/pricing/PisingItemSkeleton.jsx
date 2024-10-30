import React from 'react';
import ContentLoader from "react-content-loader"
function PisingItemSkeleton(props) {
    return (
        <ContentLoader
            speed={2}
            width={342}
            height={395}
            viewBox="0 0 342 395"
            backgroundColor="#e6e6e6"
            foregroundColor="#fcfcfc"
            {...props}
        >
            <rect x="3" y="115" rx="10" ry="10" width="332" height="28" />
            <rect x="10" y="10" rx="10" ry="10" width="322" height="31" />
            <rect x="10" y="10" rx="10" ry="10" width="322" height="37" />
            <rect x="73" y="193" rx="10" ry="10" width="171" height="60" />
            <rect x="7" y="325" rx="10" ry="10" width="313" height="44" />
            <rect x="69" y="283" rx="10" ry="10" width="184" height="28" />
        </ContentLoader>
    );
}

export default PisingItemSkeleton;