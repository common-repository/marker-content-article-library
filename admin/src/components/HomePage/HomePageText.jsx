import React from 'react';

function HomePageText(props) {
    return (
        <div className='homePageTextWrapper'>
            <h2 className="homePageTitle">Welcome to Marker!</h2>

            <p className="homePageMainText">
                <p>
                    This is the home of hundreds of thousands of articles written by real copywriters from around the
                    globe.
                </p>
                <p>
                    Simply browse our library, then purchase, personalize and repurpose these articles across your blog,
                    newsletters, social media, or website to grow and supercharge your brand marketing.
                </p>
                <p>
                    Purchasing couldn't be easier. Choose a single article or subscribe to our packages and receive
                    credits
                    to redeem monthly.
                </p>
                <p>
                    Once the article is yours, importing it into your WordPress library takes just a few clicks - it's
                    that
                    simple.
                </p>
            </p>
            <div className="ul-wrapper">
                <p className="stepsTitle">
                    Five steps to get started:
                </p>
                <ul className="steps">
                    <li className="stepsItem"> Using the search bar, enter keywords or topics you are interested in</li>
                    <li className="stepsItem"> Click on your desired article title or click preview so you can read it
                        before purchasing
                    </li>
                    <li className="stepsItem"> Add the article to your cart OR choose a subscription plan that fits your
                        needs
                    </li>
                    <li className="stepsItem">Once you complete the purchase, click the dropdown menu under your avatar
                        and go to 'Purchase history'.
                    </li>
                    <li className="stepsItem">Import your article by clicking the button and the article will appear in
                        your posts/library, ready for editing
                    </li>

                </ul>
            </div>
            <h3>
                Now, go forth and make your Mark(er)!
            </h3>
        </div>
    );
}

export default HomePageText;