import React, {useContext, useEffect} from 'react';
import PricingForm from "../components/pricing/PricingForm";
import SubscriptionsContext from "../context/SubscriptionsContext";
import PricingFormSkeleton from "../components/pricing/PricingFormSkeleton";

function SubsPricing(props) {
    const {subscriptionsState:{isFetching},getSubscriptions,setIsFetching} = useContext(SubscriptionsContext)
    useEffect(()=>{
        setIsFetching(true)
        getSubscriptions()
    },[])
    return (
        <div className="page-content container">
            <div className="pricing-content-wrapper">
                <h1 className="pricing-title">
                    Pricing
                </h1>
                <p className="pricing-text">
                    Choose a plan to suit your content needs. Access articles on a monthly or annual subscription. Get articles from as little as $4. Keep your blog, social media, and newsletter content fresh.
                </p>
                {!isFetching?<PricingForm/>:<PricingFormSkeleton/>}
            </div>
        </div>
    );
}

export default SubsPricing;