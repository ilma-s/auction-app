class JwtUtils {
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
}

export default JwtUtils;
