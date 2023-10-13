import { useEffect, useState } from 'react';

const HealthCheck = () => {
    const [healthStatus, setHealthStatus] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const backendUrl = import.meta.env.VITE_APP_URL_BACKEND;
        const healthCheckUrl = `${backendUrl}/api/health`;

        console.log(healthCheckUrl);

        fetch(healthCheckUrl)
            .then((response) => {
                if (response.ok) {
                    setHealthStatus('Backend running');
                    setLoading(false);
                } else {
                    setHealthStatus('Backend down');
                    setLoading(false);
                }
            })
            .catch(() => {
                setHealthStatus('Connection error - Backend down');
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Health Check Result: </h2>
                    <p>{healthStatus}</p>
                </div>
            )}
        </div>
    );
};

export default HealthCheck;
