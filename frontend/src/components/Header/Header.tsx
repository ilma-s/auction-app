import GavelIcon from './assets/gavel-icon.svg';
import SearchIcon from './assets/search-icon.svg';
import SocialMediaIcons from '../socialMediaIcons/SocialMediaIcons';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log(searchTerm); // Log the search term to the console
        setSearchTerm(''); // Clear the search bar
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-col">
            <div className="bg-trueGray-800">
                <div className="w-2/3 mx-auto flex justify-between pt-3 pb-3">
                    <SocialMediaIcons />
                    <div className="font-lato-bold text-white cursor-not-allowed">
                        Hi, John Doe
                    </div>
                </div>
            </div>

            <div className="w-2/3 mx-auto flex pt-4 pb-4 justify-between items-center font-lato font-light">
                <div className="flex items-center">
                    <img src={GavelIcon} alt="Gavel Icon" className="pb-4" />
                    <p className="leading-none text-2xl text-trueIndigo-500">
                        AUCTION
                    </p>
                </div>

                <div className="px-2 py-2 w-1/2 border border-gray-300 flex items-center">
                    <input
                        type="text"
                        placeholder="Try entering: Shoes"
                        className="flex-grow border-none outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        type="button"
                        className="pr-2"
                        onClick={handleSearch}
                    >
                        <img src={SearchIcon} alt="Search" />
                    </button>
                </div>

                <div className="flex justify-between gap-4 items-center font-light text-trueGray-800">
                    <NavLink
                        to={'/'}
                        className={({ isActive }) =>
                            isActive ? 'font-bold text-trueIndigo-500' : ''
                        }
                    >
                        HOME
                    </NavLink>
                    <NavLink
                        to={'/shop'}
                        className={({ isActive }) =>
                            isActive ? 'font-bold text-trueIndigo-500' : ''
                        }
                    >
                        SHOP
                    </NavLink>
                    <NavLink
                        to={'/my-account'}
                        className={({ isActive }) =>
                            isActive ? 'font-bold text-trueIndigo-500' : ''
                        }
                    >
                        MY ACCOUNT
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Header;
