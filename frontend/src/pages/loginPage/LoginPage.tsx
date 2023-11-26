import CustomCheckbox from '../../components/customCheckbox/CustomCheckbox';
import {
    EMAIL_STRING,
    PASSWORD_STRING,
    REMEMBER_ME_STRING,
    UPPERCASE_LOGIN_STRING,
    FORGOT_PASSWORD_STRING,
} from '../../utils/constants';

const LoginPage = () => {
    return (
        <div className="w-2/3 mx-auto pt-12 pb-12 flex font-lato">
            <div className="w-1/2 mx-auto border-2">
                <p className="text-center font-bold pt-4">LOGIN</p>
                <div className="pt-8 w-3/4 mx-auto">
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-trueGray-700"
                        >
                            {EMAIL_STRING}
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
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
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-trueIndigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                            className="peer hidden"
                        />
                        <label
                            htmlFor="rememberMe"
                            className="flex gap-2 items-center text-sm font-medium text-trueGray-700 cursor-pointer relative"
                        >
                            <CustomCheckbox
                                onChange={() => {
                                    // request handling
                                }}
                            />
                            {REMEMBER_ME_STRING}
                        </label>
                    </div>

                    <button
                        type="button"
                        className="w-full bg-trueIndigo-500 text-white py-2 rounded-md focus:outline-none focus:ring focus:border-trueIndigo-700"
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
