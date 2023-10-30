import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import arrowIcon from './assets/arrow-icon.svg';
import { capitalizeUrlFragments } from '../../helpers/capitalizeUrlFragment';

const mappedPaths: any = {
    item: 'Single Product',
};

const AppPath = () => {
    const location = useLocation();
    const pathnameSegments = location.pathname.split('/');

    const firstSegmentPath = `/${pathnameSegments[1]}`;

    return (
        <div className="flex gap-4 font-lato text-trueGray-800">
            <Link to={firstSegmentPath}>
                {' '}
                <p className="font-light pr-2">
                    {capitalizeUrlFragments(pathnameSegments[1])}
                </p>
            </Link>
            <img src={arrowIcon} alt="Arrow Icon" className="pr-2" />
            <p className="font-bold text-trueIndigo-500">
                {capitalizeUrlFragments(
                    mappedPaths[pathnameSegments[2]] || pathnameSegments[2],
                )}
            </p>
        </div>
    );
};

export default AppPath;
