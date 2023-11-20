import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCategoryList from '../../components/filterCategoryList/FilterCategoryList';
import ProductListInfiniteScroll from '../../components/productListInfiniteScroll/ProductListInfiniteScroll';
import ProductUtils from '../../utils/entities/ProductUtils';
import { Product } from '../../types';
import { fetchData } from '../../helpers/apiFunctions';

const ShopPage = () => {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const queryParams = new URLSearchParams(location.search);
    const [selectedCategory, setSelectedCategory] = useState(
        queryParams.get('category') || '',
    );
    const [searchTerm, setSearchTerm] = useState(
        queryParams.get('searchTerm') || '',
    );

    // Add a state variable to track whether the search term was cleared
    const [searchTermCleared, setSearchTermCleared] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);
    const [productsToLoad, setProductsToLoad] = useState(9);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loadMore, setLoadMore] = useState(true);
    const [showExploreButton, setShowExploreButton] = useState(true);
    const initRef = useRef(true);

    useEffect(() => {
        // update selectedCategory and searchTerm when location changes
        setSelectedCategory(queryParams.get('category') || '');
        const newSearchTerm = queryParams.get('searchTerm') || '';

        if (newSearchTerm !== searchTerm) {
            // reset page to 1 when the search term changes
            setCurrentPage(1);
            // set searchTermCleared to true when the search term is cleared
            setSearchTermCleared(newSearchTerm === '');
        }

        setSearchTerm(newSearchTerm);
    }, [location.search, queryParams, searchTerm]);

    const fetchMoreProducts = useCallback(async () => {
        try {
            let offset = (currentPage - 1) * productsToLoad;
            let queryParams: Record<string, string> = {
                limit: productsToLoad.toString(),
                offset: offset.toString(),
            };

            let endpoint = 'all-products';

            if (
                !initRef.current &&
                searchTerm.length === 0 &&
                searchTermCleared
            ) {
                setAllProducts([]);
                setLoadMore(true);
                // Reset searchTermCleared to false after handling it
                setSearchTermCleared(false);
            } else if (searchTerm.length > 0) {
                initRef.current = false;
                setLoadMore(true);
                queryParams = {
                    ...queryParams,
                    searchTerm: searchTerm,
                };
                endpoint = 'search';
            } else if (!loadMore) {
                return;
            }

            const data = await fetchData(endpoint, queryParams);

            if (data.products.length !== 0) {
                setHasMoreProducts(true);

                if (
                    Array.isArray(data.products) &&
                    data.products.length > 0 &&
                    searchTerm.length > 0
                ) {
                    setAllProducts(data.products);
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
                } else if (initRef.current || searchTerm.length === 0) {
                    setAllProducts((prevAllProducts) => [
                        ...prevAllProducts,
                        ...data.products,
                    ]);

                    setCurrentPage(currentPage + 1);
                }

                if (
                    data.products.length < productsToLoad &&
                    (initRef.current || searchTerm.length === 0)
                ) {
                } else {
                    setLoadMore(false);
                }
            } else {
                setHasMoreProducts(false);
            }

            setSearchResults(data.products);
        } catch (error) {
            console.error('Search request failed:', error);
        }
    }, [
        location.search,
        currentPage,
        selectedCategory,
        searchTerm,
        loadMore,
        searchTermCleared,
    ]);

    useEffect(() => {
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
