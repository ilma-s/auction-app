import SocialMediaIcons from '../socialMediaIcons/SocialMediaIcons';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-trueGray-800 text-white py-8">
            <div className="w-2/3 mx-auto flex justify-between">
                <div className="flex flex-col gap-3">
                    <p className="text-trueGray-500">AUCTION</p>
                    <div className="flex flex-col gap-2 text-trueWhite-800">
                        <Link to="/home/about-us">About Us</Link>
                        <Link to="/home/terms-and-conditions">
                            Terms and Conditions
                        </Link>
                        <Link to="/home/privacy-and-policy">
                            Privacy and Policy
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-trueGray-500">GET IN TOUCH</p>
                    <div className="flex flex-col gap-2 text-trueWhite-800">
                        <p className="cursor-not-allowed">
                            Call Us at +123-797-567-2535
                        </p>
                        <p className="cursor-not-allowed">
                            support@auction.com
                        </p>
                        <SocialMediaIcons />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
