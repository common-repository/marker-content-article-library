import WrappedApp from "./App";
import {render} from '@wordpress/element';
/**
 * Import the stylesheet for the plugin.
 */
import './style/main.scss';
import App from "./App";
import {AccountProvider} from "./context/AccountContext";


document.addEventListener("DOMContentLoaded", function (event) {
// Render the App component into the DOM
    const Page = document.querySelector('.article-page')

    if (Page) {
        render(
            <AccountProvider>
                <App/>
            </AccountProvider>,Page
        );
    }
})
