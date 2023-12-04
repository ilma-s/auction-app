import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../app/store';
import JwtUtils from '../../utils/entities/JwtUtils';

import CustomCheckbox from '../../components/customCheckbox/CustomCheckbox';
import {
    ENTER_EMAIL_OR_USERNAME,
    PASSWORD_STRING,
    REMEMBER_ME_STRING,
    UPPERCASE_LOGIN_STRING,
    FORGOT_PASSWORD_STRING,
} from '../../utils/constants';
import { selectName } from '../../app/selectors';

const LoginPage = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [isLoginButtonDisabled, setLoginButtonDisabled] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name = useSelector(selectName);

    useEffect(() => {
        if (name !== '') {
            navigate('/home');
        }
    }, [name, navigate]);

    const handleLogin = async () => {
        try {
            setLoginButtonDisabled(true);
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: identifier,
                    password,
                    rememberMe,
                }),
            });

            console.log('res: ', response);

            if (response.ok) {
                const data = await response.json();

                localStorage.setItem('token', data.token);

                if (rememberMe) {
                    document.cookie = `token=${data.token}; Secure; HttpOnly; SameSite=Strict`;
                }

                const jwt = data.token;
                const firstName = JwtUtils.decodeJWTAndGetFirstName(jwt);
                dispatch(setName(firstName));
                console.log('fname: ', firstName);

                navigate('/home');
            } else if (response.status === 401) {
                setLoginError(true);
            } else {
                console.error('Login failed', response.statusText);
            }
        } catch (error) {
            console.error('Error during login', error);
        } finally {
            setLoginButtonDisabled(false);
        }
    };

    return (
        <div className="w-2/3 mx-auto pt-12 pb-12 flex flex-col font-lato">
            {loginError && (
                <div className="w-1/2 mx-auto border-2 bg-red-500 text-white p-2 mb-4">
                    Invalid username or password. Please try again.
                </div>
            )}
            <div className="w-1/2 mx-auto border-2">
                <p className="text-center font-bold pt-4">LOGIN</p>
                <div className="pt-8 w-3/4 mx-auto">
                    <div className="mb-4">
                        <label
                            htmlFor="identifier"
                            className="block text-sm font-medium text-trueGray-700"
                        >
                            {ENTER_EMAIL_OR_USERNAME}
                        </label>
                        <input
                            type="text"
                            id="identifier"
                            placeholder="Email or username"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-trueIndigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-trueGray-700"
                        >
                            {PASSWORD_STRING}
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-trueIndigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                            className="peer hidden"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label
                            htmlFor="rememberMe"
                            className="flex gap-2 items-center text-sm font-medium text-trueGray-700 cursor-pointer relative"
                        >
                            <CustomCheckbox
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            {REMEMBER_ME_STRING}
                        </label>
                    </div>

                    <button
                        type="button"
                        className="w-full bg-trueIndigo-500 text-white py-2 rounded-md focus:outline-none focus:ring focus:border-trueIndigo-700"
                        onClick={handleLogin}
                        disabled={isLoginButtonDisabled}
                    >
                        {UPPERCASE_LOGIN_STRING}
                    </button>

                    <p className="text-trueIndigo-500 text-sm text-center mt-4 mb-8">
                        {FORGOT_PASSWORD_STRING}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
