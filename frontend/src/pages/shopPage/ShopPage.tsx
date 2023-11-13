import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCategoryList from '../../components/filterCategoryList/FilterCategoryList';
import ProductListInfiniteScroll from '../../components/productListInfiniteScroll/ProductListInfiniteScroll';
import ProductUtils from '../../utils/entities/ProductUtils';
import { Product } from '../../types';

const ShopPage = () => {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const queryParams = new URLSearchParams(location.search);
    const selectedCategory = queryParams.get('category') || '';
    const searchTerm = queryParams.get('searchTerm') || '';

    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);
    const [productsToLoad, setProductsToLoad] = useState(9);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loadMore, setLoadMore] = useState(true);
    const [showExploreButton, setShowExploreButton] = useState(true);

    const fetchMoreProducts = useCallback(async () => {
        try {
            if (!hasMoreProducts) return;

            let offset = (currentPage - 1) * productsToLoad;

            let endpoint = `all-products?limit=${productsToLoad}&offset=${offset}`;

            if (searchTerm.length > 0) {
                setLoadMore(true);
                endpoint = `search?searchTerm=${searchTerm}`;
            } else if (!loadMore) {
                return;
            }

            console.log('LM: ', loadMore);

            console.log('pass');

            const response = await fetch(`http://localhost:8080/${endpoint}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Search request failed');
            }

            const data = await response.json();

            console.log(
                'checkpoint: loadmore: ',
                loadMore,
                ' st length: ',
                searchTerm.length,
            );

            // if (loadMore && searchTerm.length > 0) {
            //     setLoadMore(false);
            // }

            console.log('data.products: ', data.products);

            if (data.products.length !== 0) {
                setHasMoreProducts(true);

                if (
                    Array.isArray(data.products) &&
                    data.products.length > 0 &&
                    searchTerm.length > 0
                ) {
                    setAllProducts(data.products);
                    setCurrentPage(currentPage + 1);
                    setHasMoreProducts(true);
                } else if (
                    Array.isArray(data.products) &&
                    data.products.length > 0 &&
                    selectedCategory
                ) {
                    const filteredProducts =
                        await ProductUtils.filterProductsByCategories(
                            selectedCategory || '',
                        );

                    setAllProducts((prevAllProducts) => [
                        ...prevAllProducts,
                        ...(filteredProducts.length > 0
                            ? filteredProducts
                            : data.products),
                    ]);

                    setCurrentPage(currentPage + 1);
                } else {
                    setAllProducts((prevAllProducts) => [
                        ...prevAllProducts,
                        ...data.products,
                    ]);

                    setCurrentPage(currentPage + 1);
                    setHasMoreProducts(true);
                }
            } else {
                setHasMoreProducts(false);
            }

            setSearchResults(data.products);

            if (showExploreButton) setLoadMore(false); //stop loading while the button is being displayed; wait for the user to click it
        } catch (error) {
            console.error('Search request failed:', error);
        }
    }, [location.search, currentPage, selectedCategory, searchTerm]);

    useEffect(() => {
        console.log('useEffect triggered with searchTerm:', searchTerm);

        fetchMoreProducts();
    }, [searchTerm, currentPage, hasMoreProducts]);

    return (
        <div className="w-2/3 mx-auto pt-12 flex font-lato">
            <div className="flex gap-8">
                <FilterCategoryList selectedCategory={selectedCategory} />
                <ProductListInfiniteScroll
                    fetchMoreProducts={fetchMoreProducts}
                    allProducts={allProducts}
                    hasMoreProducts={hasMoreProducts}
                    setLoadMore={setLoadMore}
                    showExploreButton={showExploreButton}
                    setShowExploreButton={setShowExploreButton}
                    productsToLoad={productsToLoad}
                />
            </div>
        </div>
    );
};

export default ShopPage;
