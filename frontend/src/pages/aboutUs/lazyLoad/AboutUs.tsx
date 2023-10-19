import { lazy, Suspense } from 'react';

const AboutUsComponent = lazy(() => import('../AboutUs'));

const AppPath = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <AboutUsComponent />
    </Suspense>
);

export default AppPath;
