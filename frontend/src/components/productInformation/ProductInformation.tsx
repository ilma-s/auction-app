import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    HIGHEST_BID,
    NUMBER_OF_BIDS,
    TIME_LEFT,
    PLACE_BID,
    DETAILS_STRING,
} from '../../utils/constants';
import { Product, BidInformation } from '../../types';
import { selectName } from '../../app/selectors';
import BidUtils from '../../utils/entities/BidUtils';

interface Props {
    product: Product;
    bidInformation: BidInformation;
}

const ProductDetails = ({ product, bidInformation }: Props) => {
    const [selectedSection, setSelectedSection] = useState<string>(DETAILS_STRING);

    const name = useSelector(selectName);
    const renderBidInput = name !== 'John Doe' && (
        <div className="flex pt-12 gap-8 items-center">
            <div>
                <input
                    type="text"
                    className="pl-8 pr-8 pt-3 pb-3 w-72 border-2 border-trueGray-300 focus:outline-none"
                    placeholder={BidUtils.getNextBidValue(
                        bidInformation,
                        product,
                    )}
                />
            </div>
            <div className="pt-2 pb-2 pl-3 pr-3 font-bold cursor-not-allowed">
                {PLACE_BID}
            </div>
        </div>
    );

    return (
        <div className="w-1/2">
            <p className="text-2xl font-bold">{product?.name}</p>
            <div className="flex mt-5 mb-5 gap-1 text-trueIndigo-500">
                <p className="font-light">Starts from</p>
                <p className="font-bold">${product?.startingPrice}</p>
            </div>
            <div className="pt-3 pb-3 pl-5 w-60 border-2 border-trueGray-300 text-trueGray-800">
                <div className="flex gap-1 pb-2">
                    <div className="text-trueGray-800">{HIGHEST_BID}:</div>
                    {bidInformation.highestBid !== null ? (
                        <div className="text-trueIndigo-500">
                            ${bidInformation.highestBid}
                        </div>
                    ) : (
                        <div className="text-trueIndigo-500 font-bold">
                            NO BIDS YET
                        </div>
                    )}
                </div>

                <div className="flex gap-1 pb-2">
                    <div className="text-trueGray-800">{NUMBER_OF_BIDS}:</div>
                    <div className="text-trueIndigo-500">
                        {bidInformation.numberOfBids}
                    </div>
                </div>

                <div className="flex gap-1">
                    <div className="text-trueGray-800">{TIME_LEFT}:</div>
                    <div className="text-trueIndigo-500">
                        {bidInformation.timeLeft}
                    </div>
                </div>
            </div>
            {renderBidInput}
            <div className="pt-16 pb-16">
                <div className="flex gap-16 h-12 border-b-2 border-true-gray-300">
                    <button
                        onClick={() => setSelectedSection(DETAILS_STRING)}
                        className={
                            selectedSection === DETAILS_STRING
                                ? 'pl-5 font-bold text-trueIndigo-500'
                                : 'text-trueGray-800'
                        }
                    >
                        {DETAILS_STRING}
                    </button>
                </div>
                <div className="text-trueGray-500 pt-5">
                    {product?.description}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
