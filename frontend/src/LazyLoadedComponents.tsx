import { lazy, Suspense } from 'react';

const HealthCheck = lazy(() => import('./pages/healthCheck/HealthCheck'));
const HomePage = lazy(() => import('./pages/homePage/HomePage'));
const AboutUs = lazy(() => import('./pages/aboutUs/AboutUs'));
const TermsAndConditions = lazy(
    () => import('./pages/termsAndConditions/TermsAndConditions'),
);
const PrivacyPolicy = lazy(() => import('./pages/privacyPolicy/PrivacyPolicy'));

export const LazyLoadedComponents = {
    HealthCheck: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <HealthCheck />
        </Suspense>
    ),
    HomePage: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
        </Suspense>
    ),
    AboutUs: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <AboutUs />
        </Suspense>
    ),
    TermsAndConditions: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <TermsAndConditions />
        </Suspense>
    ),
    PrivacyPolicy: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <PrivacyPolicy />
        </Suspense>
    ),
};
