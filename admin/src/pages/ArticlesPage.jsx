import React, {useContext, useEffect} from 'react';
import Article from "../components/layout/Article";
import ArticleSkeleton from "../components/layout/ArticleSkeleton";
import HomeContext from "../context/HomeContext";
import HomePageText from "../components/HomePage/HomePageText";

function ArticlesPage(props) {
    const {isFetching, getCarItemsById,homeArticles}=useContext(HomeContext)
    useEffect(()=>{
        getCarItemsById()
    },[])
    return (
            <div className="page-content container">
                <HomePageText/>

                <div className="articles-wrapper">
                    {
                        homeArticles.length ? homeArticles.map((item) => {
                            const {data}=item
                                return (<Article key={data.id} article={data} />)
                            }
                        ):<ArticleSkeleton/>
                    }
                </div>
            </div>
    );
}



export default ArticlesPage;