class ValidationUtils {
    static isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    static isValidPassword = (password: string) => {
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&\/+\-])[A-Za-z\d@$!%*?&\/+\-]{8,}$/;
        return passwordRegex.test(password);
    };
}

export default ValidationUtils;
