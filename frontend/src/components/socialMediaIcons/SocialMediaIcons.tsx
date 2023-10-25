import facebookIcon from './assets/facebook-icon.svg';
import instagramIcon from './assets/instagram-icon.svg';
import twitterIcon from './assets/twitter-icon.svg';

const SocialMediaIcons = () => {
    return (
        <div className="flex space-x-5">
            <div className="flex">
                <a href="https://www.facebook.com/AtlantBH/" target="_blank">
                    <img src={facebookIcon} alt="Facebook Icon" />
                </a>
            </div>
            <div>
                <a href="https://www.instagram.com/atlantbh" target="_blank">
                    <img src={instagramIcon} alt="Instagram Icon" />
                </a>
            </div>
            <div>
                <a href="https://twitter.com/atlantbh" target="_blank">
                    <img src={twitterIcon} alt="Twitter Icon" />
                </a>
            </div>
        </div>
    );
};

export default SocialMediaIcons;
