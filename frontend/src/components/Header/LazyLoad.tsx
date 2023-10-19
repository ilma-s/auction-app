import { lazy, Suspense } from 'react';

const HeaderComponent = lazy(() => import('./Header'));

const Header = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <HeaderComponent />
    </Suspense>
);

export default Header;
