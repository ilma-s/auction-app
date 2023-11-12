import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import gavelIcon from './assets/gavel-icon.svg';
import searchIcon from './assets/search-icon.svg';
import SocialMediaIcons from '../socialMediaIcons/SocialMediaIcons';
import {
    APP_NAME_STRING,
    SEARCH_PLACEHOLDER_STRING,
    HOME_STRING,
    SHOP_STRING,
    MY_ACCOUNT_STRING,
} from '../../utils/constants';
import { selectName } from '../../app/selectors';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const name = useSelector(selectName);

    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            return;
        }

        navigate(`shop?searchTerm=${searchTerm}`); //shop ili home -> iz urla na kojoj stranici; update q.params r.router
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        };

        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [searchTerm]);

    return (
        <div className="flex flex-col">
            <div className="bg-trueGray-800">
                <div className="w-2/3 mx-auto flex justify-between pt-3 pb-3">
                    <SocialMediaIcons />
                    <div className="font-lato-bold text-white cursor-not-allowed">
                        Hi, {name}
                    </div>
                </div>
            </div>

            <div className="w-2/3 mx-auto flex pt-4 pb-4 justify-between items-center font-lato font-light">
                <NavLink to={'/home'}>
                    <div className="flex items-center">
                        <img
                            src={gavelIcon}
                            alt="Gavel Icon"
                            className="pb-4"
                        />
                        <p className="leading-none text-2xl text-trueIndigo-500">
                            {APP_NAME_STRING}
                        </p>
                    </div>
                </NavLink>

                <div className="px-2 py-2 w-1/2 border border-gray-300 flex items-center">
                    <input
                        type="text"
                        placeholder={`Try entering: ${SEARCH_PLACEHOLDER_STRING}`}
                        className="flex-grow border-none outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="pr-2"
                        onClick={handleSearch}
                    >
                        <img src={searchIcon} alt="Search" />
                    </button>
                </div>

                <div className="flex justify-between gap-4 items-center font-light text-trueGray-800">
                    <NavLink
                        to={'/home'}
                        className={({ isActive }) =>
                            isActive ? 'font-bold text-trueIndigo-500' : ''
                        }
                    >
                        {HOME_STRING}
                    </NavLink>
                    <NavLink
                        to={'/shop'}
                        className={({ isActive }) =>
                            isActive ? 'font-bold text-trueIndigo-500' : ''
                        }
                    >
                        {SHOP_STRING}
                    </NavLink>
                    <NavLink
                        to={'/my-account'}
                        className={({ isActive }) =>
                            isActive ? 'font-bold text-trueIndigo-500' : ''
                        }
                    >
                        {MY_ACCOUNT_STRING}
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Header;
