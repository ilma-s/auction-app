import { lazy, Suspense } from 'react';

const ShopPageComponent = lazy(() => import('./ShopPage'));

const HomePage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <ShopPageComponent />
    </Suspense>
);

export default HomePage;
