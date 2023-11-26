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

const RegistrationPage = () => {
    return (
        <div className="w-2/3 mx-auto pt-12 pb-12 flex font-lato">
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
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-trueIndigo-500"
                        />
                    </div>

                    <button
                        type="button"
                        className="w-full bg-trueIndigo-500 text-white py-2 rounded-md focus:outline-none focus:ring focus:border-trueIndigo-700"
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
