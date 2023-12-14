class JwtUtils {
    static TOKEN_EXPIRY_THRESHOLD = 60;
    static CHECK_INTERVAL = 30000; // the interval for token check in milliseconds

    static decodeJWT(jwt: string) {
        const payload = jwt.split('.')[1];
        const decodedToken = JSON.parse(atob(payload));

        return decodedToken;
    }

    static decodeJWTAndGetFirstName(jwt: string) {
        const decodedToken = JwtUtils.decodeJWT(jwt);
        const firstName = decodedToken?.firstName || '';

        return firstName;
    }

    static decodeJWTAndGetExpiration(jwt: string) {
        const decodedToken = JwtUtils.decodeJWT(jwt);
        const expiration = decodedToken?.exp || 0;

        return expiration;
    }

    static handleError() {
        localStorage.clear();
        window.location.href = '/login';
    }

    static startTokenCheck = (accessToken: string, refreshToken: string) => {
        JwtUtils.checkTokenExpiry(accessToken, refreshToken);

        setInterval(() => {
            console.log('LALALALALALALA');
            JwtUtils.checkTokenExpiry(accessToken, refreshToken);
        }, JwtUtils.CHECK_INTERVAL);
    };

    static checkTokenExpiry = async (
        accessToken: string,
        refreshToken: string,
    ) => {
        // Check if the access token is about to expire
        const currentTime = Math.floor(Date.now() / 1000);
        const accessTokenExp = JwtUtils.decodeJWTAndGetExpiration(accessToken);

        if (accessTokenExp - currentTime < JwtUtils.TOKEN_EXPIRY_THRESHOLD) {
            // Access token is about to expire, use refresh token to get a new one
            const newTokens = await JwtUtils.refreshToken(refreshToken);
            localStorage.setItem('accessToken', newTokens?.accessToken);
            localStorage.setItem('refreshToken', newTokens?.refreshToken);
        }
    };

    static refreshToken = async (refreshToken: string) => {
        try {
            const response = await fetch('http://localhost:8080/api/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                return {
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                };
            } else {
                console.error('Error refreshing tokens', response.statusText);

                JwtUtils.handleError();
            }
        } catch (error) {
            console.error('Error refreshing tokens', error);

            JwtUtils.handleError();
        }
    };

    static setCookies = (cookieString: string) => {
        const cookies = cookieString.split('; ');
        cookies.forEach((cookie) => {
            const [name, value] = cookie.split('=');
            document.cookie = `${name}=${value}; Path=/; Secure; HttpOnly`;
        });
    };

    static getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        
        if (parts.length === 2 && parts[1] !== undefined) {
            return parts[1].split(';').shift();
        }
    
        return undefined;
    };
    
}

export default JwtUtils;
