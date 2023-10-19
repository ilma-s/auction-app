import AppPath from '../../components/appPath/AppPath';

const PrivacyPolicy = () => {
    return (
        <>
            <div className="flex justify-between w-2/3 mx-auto">
                <p className="font-normal">Privacy and Policy</p>
                <AppPath />
            </div>

            <div className="flex w-2/3 mx-auto pt-3 justify-center font-lato text-trueGray-800">
                <div className="w-1/2 max-w-full overflow-hidden pb-24">
                    <p className="text-4xl pt-20 pb-6">Introduction</p>
                    <p className="pb-5 text-trueGray-500">
                        This privacy policy ("policy") will help you understand
                        how AuctionApp ("us", "we", "our") uses and protects the
                        data you provide to us when you visit and use
                        sampleauctionapp.com ("blog", "service"). We reserve the
                        right to change this policy at any given time, of which
                        you will be promptly updated. If you want to make sure
                        that you are up to date with the latest changes, we
                        advise you to frequently visit this page.
                    </p>
                    <p className="pt-6 pb-3 text-xl">
                        What User Data We Collect
                    </p>
                    <ul className="pb-2 list-disc text-trueGray-500">
                        <li>Your IP address</li>
                        <li>Your contact information and email address</li>
                        <li>
                            Other information such as interests and preferences
                        </li>
                        <li>
                            Data profile regarding your online behavior on our
                            blog.
                        </li>
                    </ul>
                    <p className="pt-6 pb-2 text-xl">
                        Why We Collect Your Data
                    </p>
                    <p className="pb-2 text-trueGray-500">
                        We are collecting your data for several reasons:
                    </p>
                    <ul className="pb-2 list-disc text-trueGray-500">
                        <li>To better understand your needs.</li>
                        <li>To improve our services and products.</li>
                        <li>
                            To send you promotional emails containing the
                            information we think you will find interesting.
                        </li>
                        <li>
                            To contact you to fill out surveys and participate
                            in other types of market research.
                        </li>
                        <li>
                            To customize our blog according to your online
                            behavior and personal preferences.
                        </li>
                    </ul>
                    <p className="pt-6 pb-2 text-xl">
                        Safeguarding and Securing the Data
                    </p>
                    <p className="pb-2 text-trueGray-500">
                        [company name] is committed to securing your data and
                        keeping it confidential. [company name] has done all in
                        its power to prevent data theft, unauthorized access,
                        and disclosure by implementing the latest technologies
                        and software, which help us safeguard all the
                        information we collect online.
                    </p>
                    <p className="pt-6 pb-2 text-xl">Our Cookie Policy</p>
                    <p className="pb-2 text-trueGray-500">
                        Once you agree to allow our blog to use cookies, you
                        also agree to use the data it collects regarding your
                        online behavior (analyze web traffic, web pages you
                        visit and spend the most time on). The data we collect
                        by using cookies is used to customize our blog to your
                        needs. After we use the data for statistical analysis,
                        the data is completely removed from our systems. Please
                        note that cookies don't allow us to gain control of your
                        computer in any way. They are strictly used to monitor
                        which pages you find useful and which you do not so that
                        we can provide a better experience for you. If you want
                        to disable cookies, you can do it by accessing the
                        settings of your internet browser. You can visit
                        https://www.internetcookies.com, which contains
                        comprehensive information on how to do this on a wide
                        variety of browsers and devices.
                    </p>
                    <p className="pt-6 pb-2 text-xl">Links to Other Websites</p>
                    <p className="pn-2 text-trueGray-500">
                        Our blog contains links that lead to other websites. If
                        you click on these links [company name] is not held
                        responsible for your data and privacy protection.
                        Visiting those websites is not governed by this privacy
                        policy agreement. Make sure to read the privacy policy
                        documentation of the website you go to from our website.
                    </p>
                    <p className="pt-6 pb-2 text-xl">
                        Restricting the Collection of your Personal Data
                    </p>
                    <p className="pb-2 text-trueGray-500">
                        At some point, you might wish to restrict the use and
                        collection of your personal data. You can achieve this
                        by doing the following:
                    </p>
                    <ul className="pb-2 list-disc text-trueGray-500">
                        <li>
                            When you are filling the forms on the blog, make
                            sure to check if there is a box which you can leave
                            unchecked, if you don't want to disclose your
                            personal information.
                        </li>
                        <li>
                            If you have already agreed to share your information
                            with us, feel free to contact us via email and we
                            will be more than happy to change this for you.
                        </li>
                    </ul>
                    <p className="pb-2 text-trueGray-500">
                        AuctionApp will not lease, sell or distribute your
                        personal information to any third parties unless we have
                        your permission. We might do so if the law forces us.
                        Your personal information will be used when we need to
                        send you promotional materials if you agree to this
                        privacy policy.
                    </p>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
