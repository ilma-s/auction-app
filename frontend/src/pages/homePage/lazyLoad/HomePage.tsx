import { lazy, Suspense } from 'react';

const HomePageComponent = lazy(() => import('../HomePage'));

const AppPath = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <HomePageComponent />
    </Suspense>
);

export default AppPath;
