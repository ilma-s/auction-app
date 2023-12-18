import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
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
    const name = useSelector(selectName) || localStorage.getItem('firstName');
    const queryParams = new URLSearchParams(location.search);
    const searchTermValue = queryParams.get('searchTerm') || '';

    const navigate = useNavigate();

    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            navigate(`/shop`);
        } else {
            navigate(`/shop?searchTerm=${searchTerm}`);
        }

        if (searchInputRef.current) {
            searchInputRef.current.blur();
        }
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

    useEffect(() => {
        setSearchTerm(searchTermValue || '');
    }, [searchTermValue]);

    return (
        <div className="flex flex-col">
            <div className="bg-trueGray-800">
                <div className="w-2/3 mx-auto flex justify-between pt-3 pb-3">
                    <SocialMediaIcons />
                    {name && name.length > 0 ? (
                        <div className="font-lato-bold text-white cursor-not-allowed">
                            Hi, {name}
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <span className="font-lato-bold text-white cursor-pointer pr-3">
                                <NavLink to="/login" className="text-white">
                                    Login
                                </NavLink>
                            </span>
                            <span className="mx-2 text-trueGray-500 pr-3">
                                or
                            </span>
                            <span className="font-lato-bold text-white cursor-pointer">
                                <NavLink
                                    to="/register"
                                    className="text-white"
                                >
                                    Create an account
                                </NavLink>
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div
                className={
                    location.pathname === '/login' || location.pathname === '/register'
                        ? 'w-full border-b-2 border-true-gray-300 mx-auto flex pt-4 pb-4 justify-between items-center font-lato font-light'
                        : 'w-2/3 mx-auto flex pt-4 pb-4 justify-between items-center font-lato font-light'
                }
            >
                <NavLink
                    to={'/home'}
                    className={
                        location.pathname === '/login' || location.pathname === '/register'
                            ? 'flex justify-center items-center w-full'
                            : 'flex items-center'
                    }
                >
                    <div className="flex items-center">
                        <div>
                            <img
                                src={gavelIcon}
                                alt="Gavel Icon"
                                className="pb-4"
                            />
                        </div>
                        <div>
                            <p className="leading-none text-2xl text-trueIndigo-500">
                                {APP_NAME_STRING}
                            </p>
                        </div>
                    </div>
                </NavLink>

                {(location.pathname !== '/login' && location.pathname !== '/register') && (
                    <div className="w-2/3 mx-auto flex pt-4 pb-4 justify-between items-center font-lato font-light">
                        <div className="px-2 py-2 w-1/2 border border-gray-300 flex items-center">
                            <input
                                ref={searchInputRef}
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
                                    isActive
                                        ? 'font-bold text-trueIndigo-500'
                                        : ''
                                }
                            >
                                {HOME_STRING}
                            </NavLink>
                            <NavLink
                                to={'/shop'}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'font-bold text-trueIndigo-500'
                                        : ''
                                }
                            >
                                {SHOP_STRING}
                            </NavLink>
                            <NavLink
                                to={'/my-account'}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'font-bold text-trueIndigo-500'
                                        : ''
                                }
                            >
                                {MY_ACCOUNT_STRING}
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
