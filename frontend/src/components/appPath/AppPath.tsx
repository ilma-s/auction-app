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
    const firstSegmentPath = `${pathnameSegments[1]}`;
    const remainingSegments = pathnameSegments.slice(2);

    const pathElements = remainingSegments.map((segment, index) => (
        <div key={index} className="flex gap-4 font-lato text-trueGray-800">
            <img src={arrowIcon} alt="Arrow Icon" className="pr-2" />
            <Link to={segment}>
                <p className="font-bold text-trueIndigo-500">
                    {capitalizeUrlFragments(mappedPaths[segment] || segment)}
                </p>
            </Link>
        </div>
    ));

    return (
        <div className="flex gap-4 font-lato text-trueGray-800">
            <Link to={firstSegmentPath}>
                <p className="font-light pr-2">
                    {capitalizeUrlFragments(firstSegmentPath)}
                </p>
            </Link>
            {pathElements}
        </div>
    );
};

export default AppPath;
