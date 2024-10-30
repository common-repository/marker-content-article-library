import React, {useContext, useEffect} from 'react';
import Navbar from './components/layout/Navbar';
import {HashRouter as Router, Route, Routes, useLocation, useParams} from "react-router-dom";
import AccountPage from './pages/AccountPage'
import ArticlesPage from "./pages/ArticlesPage";
import SearchPage from "./pages/SearchPage";
import Page404 from "./pages/Page404";
import ArticlePage from "./pages/ArticlePage";
import CartPage from "./pages/CartPage";
import PaymentResults from "./pages/PaymentResults";
import AccountContext from "./context/AccountContext";
import {SearchProvider} from "./context/ArticlesSearchContext";
import {ArticleProvider} from "./context/ArticleContext";
import {CartProvider} from "./context/CartContext";
import {HomeProvider} from "./context/HomeContext";
import PurchaseHistory from "./pages/Purchase-history";
import {PurchaseProvider} from "./context/PurchaseContext";
import SubsPricing from "./pages/SubsPricing";
import {SubscriptionsProvider} from "./context/SubscriptionsContext";
import ThankYouPage from "./pages/ThankYouPage";
import Subscription from "./pages/Subscription";


function App() {

    const {
        fetchUserInfo
    } = useContext(AccountContext);
    useEffect(() => {
        fetchUserInfo()
    }, [])
    return (
        <SearchProvider>
            <ArticleProvider>
                <CartProvider>
                    <PurchaseProvider>
                        <SubscriptionsProvider>
                            <HomeProvider>
                                <Router>
                                    <Navbar/>
                                    <section className="main-wrapper bg-gray">
                                        <Routes>
                                            <Route path='/' element={
                                                <ArticlesPage/>
                                            }/>
                                            <Route path='/account/*' element={
                                                <AccountPage/>
                                            }/>
                                            <Route path='/purchase-history' element={
                                                <PurchaseHistory/>
                                            }/>
                                            <Route path='/cart' element={
                                                <CartPage/>
                                            }/>
                                            <Route path='/search-results' element={
                                                <SearchPage/>
                                            }/>
                                            <Route path='/articles/:id/:title' element={
                                                <ArticlePage/>
                                            }/>
                                            <Route path='/pricing' element={
                                                <SubsPricing/>
                                            }/>
                                            <Route path='/payment-results' element={
                                                <PaymentResults/>
                                            }/>
                                            <Route path='/thank-you' element={
                                                <ThankYouPage/>
                                            }/>
                                            <Route path='/subscription' element={
                                                <Subscription/>
                                            }/>
                                            <Route path="/404" element={<Page404/>}/>
                                            <Route path="/*" element={<Page404/>}/>
                                        </Routes>
                                    </section>
                                </Router>
                            </HomeProvider>
                        </SubscriptionsProvider>
                    </PurchaseProvider>
                </CartProvider>
            </ArticleProvider>
        </SearchProvider>
    );
}

export default App;
