import { lazy, Suspense } from 'react';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const LoginPageComponent = lazy(() => import('./LoginPage'));

const LoginPage = () => (
    <Suspense
        fallback={
            <div className="flex items-center justify-items">
                <LoadingSpinner />
            </div>
        }
    >
        <LoginPageComponent />
    </Suspense>
);

export default LoginPage;
