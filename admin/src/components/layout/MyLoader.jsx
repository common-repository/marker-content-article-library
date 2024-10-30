import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        speed={2}
        width={300}
        height={260}
        viewBox="0 0 300 260"
        backgroundColor="#e6e6e6"
        foregroundColor="#fcfcfc"
        {...props}
    >
        <rect x="0" y="4" rx="10" ry="10" width="156" height="28" />
        <rect x="0" y="54" rx="10" ry="10" width="300" height="20" />
        <rect x="0" y="86" rx="10" ry="10" width="300" height="20" />
        <rect x="0" y="118" rx="10" ry="10" width="300" height="20" />
        <rect x="-1" y="158" rx="10" ry="10" width="245" height="17" />
        <rect x="0" y="200" rx="10" ry="10" width="152" height="27" />
        <rect x="190" y="200" rx="10" ry="10" width="90" height="27" />
    </ContentLoader>
)

export default MyLoader