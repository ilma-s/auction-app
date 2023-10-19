import { useLocation } from 'react-router-dom';

import arrowIcon from './assets/arrow-icon.svg';
import { capitalizeUrlFragments } from '../../helpers/capitalizeUrlFragment';

const AppPath = () => {
    const location = useLocation();
    const pathnameSegments = location.pathname.split('/');

    return (
        <div className="flex gap-4 font-lato text-trueGray-800">
            <p className="font-light pr-2">
                {capitalizeUrlFragments(pathnameSegments[1])}
            </p>
            <img src={arrowIcon} alt="Arrow Icon" className="pr-2" />
            <p className="font-bold text-trueIndigo-500">
                {capitalizeUrlFragments(pathnameSegments[2])}
            </p>
        </div>
    );
};

export default AppPath;
