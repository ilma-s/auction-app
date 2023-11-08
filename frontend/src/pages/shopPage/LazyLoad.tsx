import { lazy, Suspense } from 'react';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const ShopPageComponent = lazy(() => import('./ShopPage'));

const HomePage = () => (
    <Suspense
        fallback={
            <div className="flex items-center justify-items">
                <LoadingSpinner />
            </div>
        }
    >
        <ShopPageComponent />
    </Suspense>
);

export default HomePage;
