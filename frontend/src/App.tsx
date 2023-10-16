import './index.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import AboutUs from './pages/aboutUs/AboutUs';
import TermsAndConditions from './pages/termsAndConditions/TermsAndConditions';
import PrivacyPolicy from './pages/privacyPolicy/PrivacyPolicy';

const HealthCheck = React.lazy(() => import('./pages/healthCheck/HealthCheck'));

const App = () => {
    return (
        <div>
            <Routes>
                <Route
                    index
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <HomePage />
                        </Suspense>
                    }
                />
                <Route
                    path="/api/health"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <HealthCheck />
                        </Suspense>
                    }
                />

                <Route
                    path="/shop/about-us"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <AboutUs />
                        </Suspense>
                    }
                />

                <Route
                    path="/shop/terms-and-conditions"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <TermsAndConditions />
                        </Suspense>
                    }
                />

                <Route
                    path="/shop/privacy-and-policy"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <PrivacyPolicy />
                        </Suspense>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
