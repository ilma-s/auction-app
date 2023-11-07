import { useState, useEffect, useCallback, useRef } from 'react';
import ProductUtils from '../../utils/entities/ProductUtils';
import { Product } from '../../types';
import { useNavigate } from 'react-router-dom';

const ProductListInfiniteScroll = ({
    searchResults,
}: {
    searchResults?: Product[];
}) => {
    const navigate = useNavigate();

    const handleProductClick = (productId: string) => {
        navigate(`/shop/item?product_id=${productId}`);
    };

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);
    const [loadMore, setLoadMore] = useState(true);

    const productsToLoad = 9;
    const containerRef = useRef<HTMLDivElement | null>(null);

    const fetchMoreProducts = useCallback(async () => {
        if (!isLoading && hasMoreProducts) {
            setIsLoading(true);

            try {
                // check if search results are available, and if not, fetch more products
                const response = searchResults
                    ? { products: searchResults }
                    : await ProductUtils.fetchLimitedProducts(
                          productsToLoad,
                          (currentPage - 1) * productsToLoad,
                      );

                if (
                    Array.isArray(response.products) &&
                    response.products.length > 0
                ) {
                    setAllProducts((prevAllProducts) => [
                        ...prevAllProducts,
                        ...response.products,
                    ]);

                    setCurrentPage(currentPage + 1);
                } else {
                    setHasMoreProducts(false);
                }
            } catch (error) {
                console.error('Error fetching products', error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [currentPage, isLoading, hasMoreProducts, searchResults]);

    useEffect(() => {
        fetchMoreProducts();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                containerRef.current &&
                !loadMore &&
                containerRef.current.getBoundingClientRect().bottom <=
                    window.innerHeight
            ) {
                fetchMoreProducts();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchMoreProducts]);

    const handleLoadMoreClick = () => {
        fetchMoreProducts();
        setLoadMore(false);
    };

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
                            <img
                                src={product.images[0].imageUrl}
                                alt={product.name}
                                className="w-34 h-64 object-contain hover:bg-trueIndigo-500 hover:opacity-30"
                            />
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
            {isLoading && <div>Loading...</div>}
            {hasMoreProducts && (
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
