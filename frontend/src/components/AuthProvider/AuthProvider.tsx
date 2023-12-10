import { ReactNode, useEffect } from 'react';
import JwtUtils from '../../utils/entities/JwtUtils';

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (accessToken && refreshToken) {
            JwtUtils.startTokenCheck(accessToken, refreshToken);
        }
    }, []);

    return <>{children}</>;
};

export default AuthProvider;
