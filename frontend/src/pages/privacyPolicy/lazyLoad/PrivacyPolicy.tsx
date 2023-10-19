import { lazy, Suspense } from 'react';

const PrivacyPolicyComponent = lazy(() => import('../PrivacyPolicy'));

const AppPath = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <PrivacyPolicyComponent />
    </Suspense>
);

export default AppPath;
