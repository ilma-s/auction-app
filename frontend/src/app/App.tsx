import { Route, Routes } from 'react-router-dom';

import HomePage from '../pages/homePage/LazyLoad';
import AboutUs from '../pages/aboutUs/LazyLoad';
import TermsAndConditions from '../pages/termsAndConditions/LazyLoad';
import PrivacyPolicy from '../pages/privacyPolicy/LazyLoad';
import HealthCheck from '../pages/healthCheck/LazyLoad';
import ProductPage from '../pages/productPage/ProductPage';
import ShopPage from '../pages/shopPage/LazyLoad';
import LoginPage from '../pages/loginPage/LazyLoad';
import RegistrationPage from '../pages/registrationPage/LazyLoad';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setName } from './store';
import JwtUtils from '../utils/entities/JwtUtils';
import AuthProvider from '../components/AuthProvider/AuthProvider';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            dispatch(setName(JwtUtils.decodeJWTAndGetFirstName(token)));
        }
    }, []);

    return (
        <div>
            <AuthProvider>
                <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/home/about-us" element={<AboutUs />} />
                    <Route
                        path="/home/terms-and-conditions"
                        element={<TermsAndConditions />}
                    />
                    <Route
                        path="/home/privacy-and-policy"
                        element={<PrivacyPolicy />}
                    />
                    <Route path="/api/health" element={<HealthCheck />} />
                    <Route path="/shop/item/" element={<ProductPage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/shop/:categoryName" element={<ShopPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                </Routes>
            </AuthProvider>
        </div>
    );
};

export default App;
