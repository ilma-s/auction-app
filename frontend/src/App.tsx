import './index.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const HealthCheck = React.lazy(() => import('./pages/healthCheck/HealthCheck'));

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route
                        index
                        element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <div>Home Page</div>
                            </Suspense>
                        }
                    />
                    <Route
                        path="/api/health"
                        element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <HealthCheck />
                            </Suspense>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
