import { lazy, Suspense } from 'react';

const HeaderComponent = lazy(() => import('../Header'));

const AppPath = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <HeaderComponent />
    </Suspense>
);

export default AppPath;
