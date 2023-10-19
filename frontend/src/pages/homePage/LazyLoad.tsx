import { lazy, Suspense } from 'react';

const HomePageComponent = lazy(() => import('./HomePage'));

const HomePage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <HomePageComponent />
    </Suspense>
);

export default HomePage;
