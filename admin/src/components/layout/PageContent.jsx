import React ,{useContext,useEffect}from "react";
import {useSearchParams,useLocation} from 'react-router-dom'
import Article from "./Article";
import ArticlesSearchContext from "../../context/ArticlesSearchContext";
import Paginate from "./Paginate";
import ArticleSkeleton from "./ArticleSkeleton";
import CartEmpty from "../Cart/cartEmpty";

function PageContent () {
    const {sendSearchRequest, searchState: {searchResultAll,articlesIsLoaded}}=useContext(ArticlesSearchContext)
    const { search } = useLocation();
    const [currentQueryParameters, setSearchParams] = useSearchParams(search);
    function getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }
    useEffect(()=>{
        if(currentQueryParameters.get("search")!==null){
            const searchObject = {
                'action':'markercontent_search_results',
                'userInfo[search]':currentQueryParameters.get("search"),
                'userInfo[page]':currentQueryParameters.get("page")
            }
            const formData = getFormData(searchObject);
            sendSearchRequest(formData)
        }
    },[])
    if( searchResultAll.length){
        return (
            <>
                <div className="articles-wrapper">
                    {
                        articlesIsLoaded ? searchResultAll.map((item) => {
                                return (<Article key={item.id} article={item} />)
                            }
                        ):<ArticleSkeleton/>
                    }
                </div>
                {
                    currentQueryParameters.get("page")?<Paginate currentQueryParameters={currentQueryParameters} setSearchParams={setSearchParams}/>:''
                }

            </>
        );
    }else{
        return (
            <CartEmpty text={'No articles'}/>
        );
    }

}

export default PageContent;