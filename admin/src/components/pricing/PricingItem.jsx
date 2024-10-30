import React, {useContext, useEffect, useState} from 'react';
import SubscriptionsContext from "../../context/SubscriptionsContext";

function PricingItem({curentPlan, isMonthActive}) {

    const [activePlan, setActivePlan] = useState({})
    const [activeYearPlan, setActiveYearPlan] = useState({})
    const [activeMonthPlan, setActiveMonthPlan] = useState({})

    const {getSubscriptionRedirectUrl} = useContext(SubscriptionsContext)

    useEffect(() => {
        if (isMonthActive) {
            setActivePlan(Object.keys(activeMonthPlan).length?activeMonthPlan:curentPlan[1])
        } else {
            setActivePlan(Object.keys(activeYearPlan).length?activeYearPlan:curentPlan[1])
        }
    }, curentPlan)

    const handleSubsClick = (id) => {
        setActivePlan(...curentPlan.filter(item => item.id === id))
        if (isMonthActive) {
            setActiveMonthPlan(...curentPlan.filter(item => item.id === id))
        } else {
            setActiveYearPlan(...curentPlan.filter(item => item.id === id))
        }
    }
    return (
        <div className={'PricingItem'}>
            <h2 className={'PricingItemTitle'}>{activePlan?.name}</h2>
            <p className="priceInfo">{activePlan?.description}</p>
            <div className="subsPlansButtons">
                {curentPlan.length ? curentPlan.map((x, i) =>
                    <button key={i} className={activePlan?.id === x.id ? 'subsPlan active' : 'subsPlan'}
                            onClick={() => handleSubsClick(x.id)}>{x.articles} articles</button>
                ) : ''}
            </div>
            <div className="price-wrapper">
                <p className={'Plan-Price'}>${activePlan?.price}{isMonthActive ? '/month' : '/year'}</p>
                <p className="priceForArticle">${activePlan?.per_article} per article</p>
            </div>
            <button className={'marker-button marker-button-primary'} onClick={()=>{
                getSubscriptionRedirectUrl(activePlan?.id)
            }}>Subscribe</button>
        </div>
    );
}

export default PricingItem;