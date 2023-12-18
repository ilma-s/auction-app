import { lazy, Suspense } from 'react';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const RegistrationPageComponent = lazy(() => import('./RegistrationPage'));

const RegistrationPage = () => (
    <Suspense
        fallback={
            <div className="flex items-center justify-items">
                <LoadingSpinner />
            </div>
        }
    >
        <RegistrationPageComponent />
    </Suspense>
);

export default RegistrationPage;
