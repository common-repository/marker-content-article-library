import React, {useContext} from 'react';
import ButtonPrimary from "../components/shared/ButtonPrimary";
import SubscriptionsContext from "../context/SubscriptionsContext";
import SearchContext from "../context/ArticlesSearchContext";

function Subscription(props) {
    const {billingInfo} = useContext(SubscriptionsContext)
    const {changeLoading} = useContext(SearchContext)

    const billingHandler = ()=>{
        changeLoading(30)
        billingInfo()
    }
    return (
        <div className={'page-content container'}>
            <div className="subscription-top">
                <h1 className={'subscriptionTitle'}>Subscriptions FAQ</h1>
                <button className={'marker-button marker-button-primary'} onClick={billingHandler}>Upgrade/Cancel Subscription</button>
            </div>
            <div className="subscription-bottom">
                <div className="subscriptionItem">
                    <h2 className="itemTitle">How do subscriptions work?</h2>
                    <p className={'itemDetails'}>Subscriptions give you access to a set amount of articles per month or year, based on your choice of subscription package. Each period you are allocated a set amount of credits that you can use to redeem articles from the site. At the end of each period your credit allocation is reset, following successful payment fulfillment.

                        Remember, unused credits do not carry over to the next period, so use them whilst you have them</p>
                </div>
                <div className="subscriptionItem">
                    <h2 className="itemTitle">Can I cancel my subscription at any time?</h2>
                    <p className={'itemDetails'}>
                        You can cancel your subscription at any time, just log into your account and follow the steps on screen to do so. Your credits for that period remain available to use until the end of this period, you paid for them after all.

                        We’ll be sad to see you go, so if you have any additional feedback or suggestions for us, get in touch on support@markercontent.com
                    </p>
                </div>
                <div className="subscriptionItem">
                    <h2 className="itemTitle">Can I get a refund on my subscription?</h2>
                    <p className={'itemDetails'}>
                        No, our model makes it hard to justify a refund, as you have full access to read each article before you buy. You can cancel or downgrade your subscription at any time.
                    </p>
                </div>
                <div className="subscriptionItem">
                    <h2 className="itemTitle">Will I lose access to my previously purchased articles if I cancel my subscription?</h2>
                    <p className={'itemDetails'}>No, the good news is that you will have access to all of your purchased articles once purchased, as long as you have an account.</p>
                </div>
                <div className="subscriptionItem">
                    <h2 className="itemTitle">Do my existing credits carry over into a new subscription period?</h2>
                    <p className={'itemDetails'}>No. You will need to use your allocated credits within the subscription period. Simply log into your account and use your credits, but remember, after the current subscription period has ended, you will not have access to any remaining credits, so use them up and use them wisely!
                        Once your subscription rolls over to the next period and your payment is processed, you will have a fresh set of credits to redeem articles with.</p>
                </div>
                <div className="subscriptionItem">
                    <h2 className="itemTitle">If I have an annual subscription, can I access all my article quota at once?</h2>
                    <p className={'itemDetails'}>Absolutely, as per your subscription model, the articles you purchase via the subscription are yours to download and use as swiftly or as slowly as you like (within your subscription period).</p>
                </div>
                <div className="subscriptionItem">
                    <h2 className="itemTitle">How quickly after activating my subscription will I be able to access and download articles?</h2>
                    <p className={'itemDetails'}>Instantly, right-on-cue, in the blink of an eye. Yep, as soon as your subscription is confirmed, a whole new world of articles will be available to you to download in just a click!</p>
                </div>
                <div className="subscriptionItem">
                    <h2 className="itemTitle">Will my payment details be stored on Marker’s system even after I cancel my subscription?</h2>
                    <p className={'itemDetails'}>We never store payment details, these are held via our third-party payment partners. Once you end your subscription, we simply retain your contact details and purchase history, until or unless you permanently delete your profile via your Marker log in.</p>
                </div>
                <div className="subscriptionItem">
                    <h2 className="itemTitle">Why should I choose a subscription instead of just buying single articles?</h2>
                    <p className={'itemDetails'}>Well, think of it this way. You could pay $19 for a single article which is great value, or you could subscribe and pay just $4 for a single article - it just makes sense and gives you more value, if we do say so ourselves.</p>
                </div>
                <div className="subscriptionItem">
                    <h2 className="itemTitle">I have an existing Marker subscription. Can I upgrade or downgrade to a different plan?</h2>
                    <p className={'itemDetails'}>If you have an existing subscription, you can upgrade or downgrade at any time, your next payment will be adjusted accordingly at the end of the existing period and your payment in the current period is adjusted accordingly to upgrade, so you will only pay the difference in this instance.
                    </p>
                </div>
                <div className="subscriptionItem">
                    <h2 className="itemTitle">Can multiple team members have access to a Marker subscription plan?</h2>
                    <p className={'itemDetails'}>Right now we only enable one sign in per account, but stay tuned for updates on this coming soon!</p>
                </div>
                <div className="subscriptionItem">
                    <h2 className="itemTitle">What happens if I run out of articles on my monthly subscription plan?</h2>
                    <p className={'itemDetails'}>If your current subscription model doesn't fulfill your content needs, then you’ve got a few options.

                        You can either upgrade your subscription and unlock more articles, or if you have no credits left in your subscription you can purchase articles for $19 outside of your subscription (simply add to cart) or, (and this one pains us too) you can wait until your subscription period rolls over to get your hands on a new batch of freshly cooked content when the new period begins. See here for more information.</p>
                </div>
                <div className="subscriptionItem">
                    <h2 className="itemTitle">I need to change my payment method details, help!</h2>
                    <p className={'itemDetails'}>Don’t worry, this one’s simple. Just log into your account, go to upgrade/cancel subscription and in the Stripe section update your payment method, done!</p>
                </div>
            </div>
        </div>
    );
}

export default Subscription;