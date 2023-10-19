import { lazy, Suspense } from 'react';

const HealthCheckComponent = lazy(() => import('../HealthCheck'));

const AppPath = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <HealthCheckComponent />
    </Suspense>
);

export default AppPath;
