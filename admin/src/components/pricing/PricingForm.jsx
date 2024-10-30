import React, {useContext, useEffect, useState} from 'react';
import PricingItem from "./PricingItem";
import {Link} from "react-router-dom";
import SubscriptionsContext from "../../context/SubscriptionsContext";

function PricingForm(props) {
    const {subscriptionsState: {subscriptionTypes}} = useContext(SubscriptionsContext)
    const [selectedSubs, setSelectedSubs] = useState([])
    const [isMonthActive, setIsMonthActive] = useState(true);
    const [isYearActive, setIsYearActive] = useState(false);

    useEffect(() => {
        setSelectedSubs(subscriptionTypes.slice(0, 3))
    }, [])

    function handleSubscription(MonthOrYear) {
        if (MonthOrYear === 1) {
            setSelectedSubs(subscriptionTypes.slice(-3))
            setIsMonthActive(false)
            setIsYearActive(true)
        } else {
            setSelectedSubs(subscriptionTypes.slice(0, 3))
            setIsMonthActive(true)
            setIsYearActive(false)
        }
    }

    return (
        <div className={'PricingFormWrapper'}>
            <div className="pricingSwitcher">
                <button className={isYearActive ? "switcherButton active" : 'switcherButton'}
                        onClick={() => handleSubscription(1)}>Annual Plans
                </button>
                <button className={isMonthActive ? "switcherButton active" : 'switcherButton'}
                        onClick={() => handleSubscription(2)}>Monthly Plans
                </button>
            </div>
            <div className="plansWrapper">
                {selectedSubs.length ? <PricingItem curentPlan={selectedSubs} isMonthActive={isMonthActive}/> : ''}
                <div className={'PricingItem'}>
                    <h2 className={'PricingItemTitle'}>Single Article</h2>
                    <p className="priceInfo">Any article, any time, no commitment</p>
                    <div className="subsPlansButtons">
                        <button className={'subsPlan active'}> 1 Article</button>
                    </div>
                    <div className="price-wrapper">
                        <p className={'Plan-Price'}>$19</p>
                        <p className="priceForArticle">1 article</p>
                    </div>
                    <Link className={'home'} to={'/'}>
                        <button className={'marker-button marker-button-secondary'}>Browse articles</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PricingForm;