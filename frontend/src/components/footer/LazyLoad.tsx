import { lazy, Suspense } from 'react';

const FooterComponent = lazy(() => import('./Footer'));

const Footer = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <FooterComponent />
    </Suspense>
);

export default Footer;
