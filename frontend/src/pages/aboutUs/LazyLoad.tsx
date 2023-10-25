import { lazy, Suspense } from 'react';

const AboutUsComponent = lazy(() => import('./AboutUs'));

const AboutUs = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <AboutUsComponent />
    </Suspense>
);

export default AboutUs;
