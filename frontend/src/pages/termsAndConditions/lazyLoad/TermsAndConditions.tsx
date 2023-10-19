import { lazy, Suspense } from 'react';

const TermsAndConditionsComponent = lazy(() => import('../TermsAndConditions'));

const AppPath = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <TermsAndConditionsComponent />
    </Suspense>
);

export default AppPath;
