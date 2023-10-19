import { lazy, Suspense } from 'react';

const FooterComponent = lazy(() => import('../Footer'));

const AppPath = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <FooterComponent />
    </Suspense>
);

export default AppPath;
