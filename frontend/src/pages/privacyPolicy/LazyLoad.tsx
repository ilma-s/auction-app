import { lazy, Suspense } from 'react';

const PrivacyPolicyComponent = lazy(() => import('./PrivacyPolicy'));

const PrivacyPolicy = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <PrivacyPolicyComponent />
    </Suspense>
);

export default PrivacyPolicy;
