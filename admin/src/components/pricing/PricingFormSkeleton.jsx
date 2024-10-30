import React from 'react';
import PisingItemSkeleton from "./PisingItemSkeleton";

function PricingFormSkeleton(props) {
    return (
        <div className={'plansWrapper'}>
            <PisingItemSkeleton/>
            <PisingItemSkeleton/>
        </div>
    );
}

export default PricingFormSkeleton;