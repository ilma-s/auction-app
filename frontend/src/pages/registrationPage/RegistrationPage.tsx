import { useEffect, useState } from 'react';
import {
    FIRST_NAME_STRING,
    LAST_NAME_STRING,
    ENTER_STRING,
    EMAIL_STRING,
    PASSWORD_STRING,
    REGISTER_STRING,
    ALREADY_HAVE_AN_ACCOUNT_STRING,
    CAPITALIZED_LOGIN_STRING,
} from '../../utils/constants';

import JwtUtils from '../../utils/entities/JwtUtils';
import ValidationUtils from '../../utils/entities/ValidationUtils';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../app/store';
import { selectName } from '../../app/selectors';

const RegistrationPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegisterButtonDisabled, setRegisterButtonDisabled] =
        useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useSelector(selectName);


    useEffect(() => {
        if (name !== '') {
            navigate('/home');
        }
    }, [name, navigate]);

    const handleRegister = async () => {
        try {
            setRegisterButtonDisabled(true);

            // Validation checks
            if (!ValidationUtils.isValidEmail(email)) {
                setErrorMessage('Please enter a valid email address.');
                return;
            }

            if (!ValidationUtils.isValidPassword(password)) {
                setErrorMessage(
                    'Password must be at least 8 characters long and include at least one uppercase letter, one symbol, and one number.',
                );
                return;
            }

            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    firstName,
                    lastName,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const firstName = data.firstName;

                if (firstName.length > 0) {
                    const localStorageKey = 'firstName'; 
                    localStorage.setItem(localStorageKey, firstName);
                    dispatch(setName(firstName));
                }

                navigate('/home');
            } else {
                const errorData = await response.text();
                setErrorMessage(errorData);
                console.error('Registration failed', errorData);
            }
        } catch (error) {
            console.error('Error during registration', error);
        } finally {
            setRegisterButtonDisabled(false);
        }
    };

    const handleBeforeUnload = () => {
        localStorage.clear();
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };

    return (
        <div className="w-2/3 mx-auto pt-12 pb-12 flex flex-col font-lato">
            {errorMessage.length > 0 && (
                <div className="w-1/2 mx-auto border-2 bg-red-500 text-white p-4 mb-4 flex items-center justify-center">
                    <span className="text-xl">&#9888;</span>
                    <span className="ml-2 font-bold">{errorMessage}</span>
                </div>
            )}
            <div className="w-1/2 mx-auto border-2">
                <p className="text-center font-bold pt-4">REGISTER</p>
                <div className="pt-8 w-3/4 mx-auto">
                    <div className="mb-8">
                        <label
                            htmlFor="firstName"
                            className="block pb-2 text-sm font-medium text-trueGray-700"
                        >
                            {FIRST_NAME_STRING}
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-trueIndigo-500"
                        />
                    </div>

                    <div className="mb-8">
                        <label
                            htmlFor="lastName"
                            className="pb-2 block text-sm font-medium text-trueGray-700"
                        >
                            {LAST_NAME_STRING}
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-trueIndigo-500"
                        />
                    </div>

                    <div className="mb-8">
                        <label
                            htmlFor="username"
                            className="pb-2 block text-sm font-medium text-trueGray-700"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-trueIndigo-500"
                        />
                    </div>

                    <div className="mb-8">
                        <label
                            htmlFor="email"
                            className="pb-2 block text-sm font-medium text-trueGray-700"
                        >
                            {ENTER_STRING} {EMAIL_STRING}
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-trueIndigo-500"
                        />
                    </div>

                    <div className="mb-8">
                        <label
                            htmlFor="password"
                            className="pb-2 block text-sm font-medium text-trueGray-700"
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

                    <button
                        type="button"
                        className="w-full bg-trueIndigo-500 text-white py-2 rounded-md focus:outline-none focus:ring focus:border-trueIndigo-700"
                        onClick={handleRegister}
                        disabled={isRegisterButtonDisabled}
                    >
                        {REGISTER_STRING}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-sm text-center mt-4 mb-8">
                        <p className="text-trueGray-500">
                            {ALREADY_HAVE_AN_ACCOUNT_STRING}
                        </p>
                        <a href="/login" className="text-trueIndigo-500">
                            {CAPITALIZED_LOGIN_STRING}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
