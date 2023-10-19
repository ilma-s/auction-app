import { lazy, Suspense } from 'react';

const HealthCheckComponent = lazy(() => import('./HealthCheck'));

const HealthCheck = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <HealthCheckComponent />
    </Suspense>
);

export default HealthCheck;
