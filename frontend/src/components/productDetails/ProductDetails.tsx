import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    PLACE_BID,
    DETAILS_STRING,
    NOTIFICATION_TYPES,
} from '../../utils/constants';
import { Product, BidInformation } from '../../types';
import { setNotification } from '../../app/store';
import BidUtils from '../../utils/entities/BidUtils';
import { selectName } from '../../app/selectors';
import React from 'react';

interface Props {
    product: Product;
    bidInformation: BidInformation;
}

const ProductDetails = ({ product, bidInformation }: Props) => {
    const [selectedSection, setSelectedSection] =
        useState<string>(DETAILS_STRING);
    const [bidValue, setBidValue] = useState<string>('');
    const [currentMaxBid, setCurrentMaxBid] = useState(
        BidUtils.getNextBidValue(bidInformation, product),
    );
    const [biddingOpen, setBiddingOpen] = useState(true);

    const bidInputRef = useRef<HTMLInputElement | null>(null);

    const handleBidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBidValue(event.target.value);
    };

    let userSet = false;
    let userAllowed = false;

    const name = useSelector(selectName);
    const dispatch = useDispatch();

    if (name.length > 0) {
        userSet = true;

        if (product.sellerId.username !== name) {
            userAllowed = true;
        }
    }

    useEffect(() => {
        // Check if bidding is still open based on the product's end date
        const isBiddingOpen =
            product.endDate && new Date() < new Date(product.endDate);
        setBiddingOpen(isBiddingOpen);
    }, [product.endDate]);

    const placeBid = async (enteredBid: number): Promise<boolean> => {
        try {
            const response = await fetch('http://localhost:8080/place-bid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: enteredBid,
                    bidderName: name,
                    productId: product.productId,
                }),
            });


            if (!response.ok) {
                console.error('Failed to place bid:', response.statusText);
                return false;
            }

            const responseData = await response.json();
            console.log('Bid placed successfully');

            if (responseData.message.length > 0) {
                dispatch(
                    setNotification(NOTIFICATION_TYPES.OUTBID_COMPETITION),
                );
            }

            return true;
        } catch (error) {
            console.error('Error placing bid:', error);
            return false;
        }
    };

    const handleFormSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();
        await handleBidSubmission();
    };

    const handleKeyDown = async (
        event: React.KeyboardEvent<HTMLFormElement>,
    ) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            await handleBidSubmission();
        }
    };

    const handleBidSubmission = async () => {
        const enteredBid = parseFloat(bidValue);

        if (!isNaN(enteredBid) && enteredBid > currentMaxBid) {
            try {
                const bidPlaced = await placeBid(enteredBid);

                if (bidPlaced) {
                    // Valid bid
                    setBidValue('');
                    // Update maxBid
                    setCurrentMaxBid(enteredBid);
                    dispatch(
                        setNotification(NOTIFICATION_TYPES.HIGHEST_BIDDER),
                    );
                } else {
                    dispatch(
                        setNotification(NOTIFICATION_TYPES.HIGHER_BIDS),
                    );
                }
            } catch (error) {
                // Handle other errors if needed
            }
        } else {
            dispatch(setNotification(NOTIFICATION_TYPES.HIGHER_BIDS));
        }
    };

    return (
        <div className="w-1/2">
            <p className="text-2xl font-bold">{product?.name}</p>
            <div className="flex mt-5 mb-5 gap-1 text-trueIndigo-500">
                <p className="font-light">Starts from</p>
                <p className="font-bold">${product?.startingPrice}</p>
            </div>

            {userSet && userAllowed && biddingOpen && (
                <form onSubmit={handleFormSubmit} onKeyDown={handleKeyDown}>
                    <div className="flex pt-12 gap-8 items-center">
                        <div>
                            <input
                                ref={bidInputRef}
                                type="text"
                                className="pl-8 pr-8 pt-3 pb-3 w-72 border-2 border-trueGray-300 focus:outline-none"
                                placeholder={`Enter $${
                                    currentMaxBid + 1
                                } or higher`}
                                value={bidValue}
                                onChange={handleBidChange}
                            />
                        </div>
                        <div className="pt-2 pb-2 pl-3 pr-3 font-bold">
                            <button type="submit">{PLACE_BID}</button>
                        </div>
                    </div>
                </form>
            )}

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
