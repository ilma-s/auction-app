import { lazy, Suspense } from 'react';

const TermsAndConditionsComponent = lazy(() => import('./TermsAndConditions'));

const TermsAndConditions = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <TermsAndConditionsComponent />
    </Suspense>
);

export default TermsAndConditions;
