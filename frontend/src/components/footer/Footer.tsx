import SocialMediaIcons from '../socialMediaIcons/SocialMediaIcons';
import { Link } from 'react-router-dom';

import {
    APP_NAME_STRING,
    ABOUT_US_STRING,
    TERMS_AND_CONDITIONS_STRING,
    PRIVACY_AND_POLICY_STRING,
    GET_IN_TOUCH_STRING,
    CONTACT_NUMBER_STRING,
    CONTACT_EMAIL_STRING,
} from '../../utils/constants';

const Footer = () => {
    return (
        <footer className="bg-trueGray-800 text-white py-8">
            <div className="w-2/3 mx-auto flex justify-between">
                <div className="flex flex-col gap-3">
                    <p className="text-trueGray-500">{APP_NAME_STRING}</p>
                    <div className="flex flex-col gap-2 text-trueWhite-800">
                        <Link to="/home/about-us">{ABOUT_US_STRING}</Link>
                        <Link to="/home/terms-and-conditions">
                            {TERMS_AND_CONDITIONS_STRING}
                        </Link>
                        <Link to="/home/privacy-and-policy">
                            {PRIVACY_AND_POLICY_STRING}
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-trueGray-500">{GET_IN_TOUCH_STRING}</p>
                    <div className="flex flex-col gap-2 text-trueWhite-800">
                        <p className="cursor-not-allowed">
                            Call Us at {CONTACT_NUMBER_STRING}
                        </p>
                        <p className="cursor-not-allowed">
                            {CONTACT_EMAIL_STRING}
                        </p>
                        <SocialMediaIcons />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
