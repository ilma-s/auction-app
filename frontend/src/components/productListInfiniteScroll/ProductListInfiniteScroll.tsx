import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Product } from '../../types';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import ProductCard from '../productCard/ProductCard';

interface ProductListProps {
    fetchMoreProducts: () => Promise<void>;
    allProducts: Product[];
    fetchedProductsLength: number;
    setLoadMore: Dispatch<SetStateAction<boolean>>;
    showExploreButton: boolean;
    productsToLoad: number;
    onExploreClick: () => void;
}

const ProductListInfiniteScroll = ({
    fetchMoreProducts,
    allProducts,
    fetchedProductsLength,
    setLoadMore,
    showExploreButton,
    productsToLoad,
    onExploreClick,
}: ProductListProps) => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleProductClick = (productId: string) => {
        navigate(`/shop/item?product_id=${productId}`);
    };

    const handleScroll = useCallback(() => {
        if (
            containerRef.current &&
            containerRef.current.getBoundingClientRect().bottom <=
                window.innerHeight &&
            !isLoading &&
            fetchedProductsLength >= productsToLoad
        ) {
            setIsLoading(true);

            if (!showExploreButton) {
                console.log('allProducts.length: ', allProducts.length);
                console.log('MMMMMMMMMMMmm');
                setLoadMore(true);
            }

            fetchMoreProducts().finally(() => {
                setIsLoading(false);
            });
        }
    }, [fetchMoreProducts, isLoading, allProducts, productsToLoad]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const handleLoadMoreClick = async () => {
        setIsLoading(true);

        try {
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA');
            setLoadMore(true);
            await fetchMoreProducts();
            // call the callback function provided by the parent component instead of setting the showExploreMore state here
            onExploreClick();
        } catch (error) {
            console.error('Error while loading more:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-2/3">
            <div className="pb-20" ref={containerRef}>
                <div className="grid grid-cols-3 grid-rows-3 gap-x-28 gap-y-8">
                    {allProducts.map((product) => (
                        <ProductCard
                            key={product.productId}
                            product={product}
                            onProductClick={handleProductClick}
                        />
                    ))}
                </div>
            </div>
            {isLoading ? (
                <div className="flex items-center justify-center h-24">
                    <LoadingSpinner />
                </div>
            ) : null}
            {allProducts.length > 0 && showExploreButton && (
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
