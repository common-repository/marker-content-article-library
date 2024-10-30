import React, { useContext } from 'react'
import LoadingBar from 'react-top-loading-bar'
import SearchContext from "../../context/ArticlesSearchContext";


const TopBarPreloader = () => {
    const {searchState: {topLoader},changeLoading}=useContext(SearchContext)
    return (
        <>
            <LoadingBar
                color='#00C49C'
                progress={topLoader}
                onLoaderFinished={() => changeLoading(topLoader)}
                shadow={false}
                containerStyle={{position: 'absolute',}}
            />
        </>
    )
}

export default TopBarPreloader