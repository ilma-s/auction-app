import ArrowIcon from './assets/arrow-icon.svg';
import { AppPathProps } from '../../types';

type Props = {
    pageInfo: AppPathProps;
};

const AppPath = ({ pageInfo }: Props) => {
    return (
        <div className="flex w-2/3 mx-auto pt-5 justify-between font-lato text-trueGray-800">
            <p className="font-bold">{pageInfo.name}</p>
            <div className="flex gap-4">
                <p className="font-light pr-2">Home</p>
                <img src={ArrowIcon} alt="Arrow Icon" className="pr-2" />
                <p className="font-bold text-trueIndigo-500">{pageInfo.name}</p>
            </div>
        </div>
    );
};

export default AppPath;
