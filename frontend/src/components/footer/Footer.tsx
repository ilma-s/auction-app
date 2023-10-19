import SocialMediaIcons from '../socialMediaIcons/SocialMediaIcons';
import { Link } from 'react-router-dom';

import {
    APP_NAME,
    ABOUT_US,
    TERMS_AND_CONDITIONS,
    PRIVACY_AND_POLICY,
    GET_IN_TOUCH,
    CONTACT_NUMBER,
    CONTACT_EMAIL,
} from '../../utils/constants';

const Footer = () => {
    return (
        <footer className="bg-trueGray-800 text-white py-8">
            <div className="w-2/3 mx-auto flex justify-between">
                <div className="flex flex-col gap-3">
                    <p className="text-trueGray-500">{APP_NAME}</p>
                    <div className="flex flex-col gap-2 text-trueWhite-800">
                        <Link to="/home/about-us">{ABOUT_US}</Link>
                        <Link to="/home/terms-and-conditions">
                            {TERMS_AND_CONDITIONS}
                        </Link>
                        <Link to="/home/privacy-and-policy">
                            {PRIVACY_AND_POLICY}
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-trueGray-500">{GET_IN_TOUCH}</p>
                    <div className="flex flex-col gap-2 text-trueWhite-800">
                        <p className="cursor-not-allowed">
                            Call Us at {CONTACT_NUMBER}
                        </p>
                        <p className="cursor-not-allowed">
                            {CONTACT_EMAIL}
                        </p>
                        <SocialMediaIcons />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
