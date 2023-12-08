import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import arrowIcon from './assets/arrow-icon.svg';
import { capitalizeUrlFragments } from '../../helpers/capitalizeUrlFragment';
import { wrap } from 'module';

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
            <p className="font-bold text-trueIndigo-500">
                {capitalizeUrlFragments(mappedPaths[segment] || segment)}
            </p>
        </div>
    ));

    return (
        <div className="flex gap-4 font-lato text-trueGray-800">
            <Link to={`/${firstSegmentPath}`}>
                <p className="font-light pr-2 whitespace-nowrap overflow-hidden">
                    {capitalizeUrlFragments(firstSegmentPath)}
                </p>
            </Link>
            {pathElements}
        </div>
    );
};

export default AppPath;