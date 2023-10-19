import AppPath from '../../components/appPath/AppPath';

const AboutUs = () => {
    return (
        <>
            <div className="flex justify-between w-2/3 mx-auto">
                <p className="font-normal">About Us</p>
                <AppPath />
            </div>

            <div className="flex w-2/3 mx-auto pt-24">
                <p className="text-4xl pb-4">About Us</p>
            </div>

            <div className="flex w-2/3 mx-auto justify-between gap-2 pb-24">
                <div className="flex flex-col w-1/2 pr-24 text-trueGray-500">
                    <div>
                        <p className="pb-5">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Tempor orci dapibus ultrices in
                            iaculis nunc. Tincidunt vitae semper quis lectus.
                            Non odio euismod lacinia at quis risus. Ipsum dolor
                            sit amet consectetur adipiscing elit duis tristique
                            sollicitudin. Arcu ac tortor dignissim convallis.
                            Mauris augue neque gravida in fermentum. Nec feugiat
                            nisl pretium fusce. Massa ultricies mi quis
                            hendrerit dolor. Massa tincidunt nunc pulvinar
                            sapien et ligula ullamcorper. Risus pretium quam
                            vulputate dignissim suspendisse. Tortor aliquam
                            nulla facilisi cras fermentum odio eu. Feugiat in
                            ante metus dictum at tempor. Feugiat in fermentum
                            posuere urna nec. Pharetra diam sit amet nisl
                            suscipit adipiscing bibendum est ultricies. Dui
                            faucibus in ornare quam viverra orci.
                        </p>
                        <p>
                            Quis viverra nibh cras pulvinar mattis nunc sed
                            blandit libero. Feugiat in ante metus dictum at
                            tempor commodo. Cursus eget nunc scelerisque viverra
                            mauris in aliquam sem fringilla. Congue nisi vitae
                            suscipit tellus mauris a diam. Pretium quam
                            vulputate dignissim suspendisse in est ante. Nunc
                            faucibus a pellentesque sit amet porttitor eget
                            dolor morbi. Magna eget est lorem ipsum dolor sit
                            amet consectetur. Bibendum at varius vel pharetra
                            vel turpis nunc. Imperdiet nulla malesuada
                            pellentesque elit eget gravida cum sociis natoque.
                            Diam ut venenatis tellus in metus vulputate. Enim
                            blandit volutpat maecenas volutpat blandit aliquam
                            etiam erat velit.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col w-1/2 gap-2 overflow-hidden">
                    <img
                        src="/src/pages/aboutUs/assets/about-us-2.jpg"
                        alt=""
                        className="w-full max-w-full"
                    />
                    <div className="flex gap-2">
                        <img
                            src="/src/pages/aboutUs/assets/about-us-1.jpg"
                            alt=""
                            className="w-1/2 max-w-full"
                        />
                        <img
                            src="/src/pages/aboutUs/assets/about-us-3.jpg"
                            alt=""
                            className="w-1/2 max-w-full"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;
