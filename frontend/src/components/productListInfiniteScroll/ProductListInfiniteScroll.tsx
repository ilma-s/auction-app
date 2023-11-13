import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Product } from '../../types';
import { useNavigate } from 'react-router-dom';
import bidIcon from './assets/bid-icon.svg';
import favoriteIcon from './assets/favorite-icon.svg';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

interface ProductListProps {
    fetchMoreProducts: () => Promise<void>;
    allProducts: Product[];
    hasMoreProducts: boolean;
    setLoadMore: Dispatch<SetStateAction<boolean>>;
    showExploreButton: boolean;
    setShowExploreButton: Dispatch<SetStateAction<boolean>>;
    productsToLoad: number;
}

const ProductListInfiniteScroll = ({
    fetchMoreProducts,
    allProducts,
    hasMoreProducts,
    setLoadMore,
    showExploreButton,
    setShowExploreButton,
    productsToLoad,
}: ProductListProps) => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleProductClick = (productId: string) => {
        navigate(`/shop/item?product_id=${productId}`);
    };

    const handleScroll = () => {
        if (
            containerRef.current &&
            containerRef.current.getBoundingClientRect().bottom <=
                window.innerHeight &&
            !isLoading &&
            hasMoreProducts &&
            allProducts.length >= productsToLoad
        ) {
            setIsLoading(true);

            fetchMoreProducts().finally(() => {
                setIsLoading(false);
            });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchMoreProducts, isLoading, hasMoreProducts, allProducts]);

    const handleLoadMoreClick = async () => {
        setIsLoading(true);
        setShowExploreButton(false);

        try {
            setLoadMore(true);
            await fetchMoreProducts();
        } catch (error) {
            console.error('Error while loading more:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // check if there are enough items to show the "Explore More" button
        if (allProducts.length >= 9) {
            setShowExploreButton(true);
        } else {
            setShowExploreButton(false);
        }
    }, [allProducts]);

    return (
        <div className="w-2/3">
            <div className="pb-20" ref={containerRef}>
                <div className="grid grid-cols-3 grid-rows-3 gap-x-28 gap-y-8">
                    {allProducts.map((product) => (
                        <div
                            key={product.productId}
                            className="w-64 h-80 relative cursor-pointer transition-transform h-96 ease-in"
                            onClick={() =>
                                handleProductClick(product.productId)
                            }
                        >
                            <div className="group relative">
                                <img
                                    src={product.images[0].imageUrl}
                                    alt={product.name}
                                    className="w-34 h-64 object-contain"
                                />
                                <div className="group-overlay absolute inset-0 bg-trueIndigo-500/50 flex justify-center items-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                                    <div className="text-white flex justify-center items-center gap-3">
                                        <div
                                            className="flex gap-2 bg-white cursor-not-allowed p-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            <div className="text-black">
                                                Wishlist
                                            </div>
                                            <img
                                                src={favoriteIcon}
                                                alt="Favorite"
                                                width="25"
                                                height="25"
                                            />
                                        </div>
                                        <div
                                            className="flex gap-2 bg-white cursor-not-allowed p-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            <div className="text-black">
                                                Bid
                                            </div>
                                            <img
                                                src={bidIcon}
                                                alt="Bid"
                                                width="25"
                                                height="25"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="font-bold text-lg mb-2 pt-3">
                                {product.name}
                            </p>
                            <div className="flex gap-1">
                                <p className="text-trueGray-500">Start From</p>
                                <p className="text-trueIndigo-500">
                                    ${product.startingPrice}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isLoading ? (
                <div className="flex items-center justify-center h-24">
                    <LoadingSpinner />
                </div>
            ) : null}
            {showExploreButton && hasMoreProducts && (
                <button
                    onClick={handleLoadMoreClick}
                    className="pt-3 pb-3 pl-8 pr-8 mb-5 bg-trueIndigo-500 text-white mx-auto my-4 block"
                >
                    Explore More
                </button>
            )}
        </div>
    );
};

export default ProductListInfiniteScroll;
