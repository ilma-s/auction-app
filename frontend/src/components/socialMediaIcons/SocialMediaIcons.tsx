import FacebookIcon from './assets/facebook-icon.svg';
import InstagramIcon from './assets/instagram-icon.svg';
import TwitterIcon from './assets/twitter-icon.svg';

const SocialMediaIcons = () => {
    return (
        <div className="flex space-x-5">
            <div className="flex">
                <a href="https://www.facebook.com/AtlantBH/" target="_blank">
                    <img src={FacebookIcon} alt="Facebook Icon" />
                </a>
            </div>
            <div>
                <a href="https://www.instagram.com/atlantbh" target="_blank">
                    <img src={InstagramIcon} alt="Instagram Icon" />
                </a>
            </div>
            <div>
                <a href="https://twitter.com/atlantbh" target="_blank">
                    <img src={TwitterIcon} alt="Twitter Icon" />
                </a>
            </div>
        </div>
    );
};

export default SocialMediaIcons;
