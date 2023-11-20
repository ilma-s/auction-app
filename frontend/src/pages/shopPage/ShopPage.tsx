import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterCategoryList from '../../components/filterCategoryList/FilterCategoryList';
import ProductListInfiniteScroll from '../../components/productListInfiniteScroll/ProductListInfiniteScroll';
import ProductUtils from '../../utils/entities/ProductUtils';
import { Product } from '../../types';
import { fetchData } from '../../helpers/apiFunctions';

const ShopPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get('category') || '',
    );
    const [searchTerm, setSearchTerm] = useState(
        searchParams.get('searchTerm') || '',
    );

    // a state variable to track whether the search term was cleared
    const [searchTermCleared, setSearchTermCleared] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);
    const [productsToLoad, setProductsToLoad] = useState(9);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loadMore, setLoadMore] = useState(true);
    const [showExploreButton, setShowExploreButton] = useState(true);
    const initRef = useRef(true);

    const [suggestedTerm, setSuggestedTerm] = useState<string | null>(null);
    const [showSuggestedTerm, setShowSuggestedTerm] = useState(true);

    useEffect(() => {
        // update selectedCategory and searchTerm when searchParams change
        setSelectedCategory(searchParams.get('category') || '');
        let newSearchTerm = searchParams.get('searchTerm') || '';

        if (suggestedTerm && suggestedTerm?.length > 0) {
            newSearchTerm = suggestedTerm;
        }

        if (newSearchTerm !== searchTerm) {
            // reset page to 1 when the search term changes
            setCurrentPage(1);
            // set searchTermCleared to true when the search term is cleared
            setSearchTermCleared(newSearchTerm === '');
        }

        setSearchTerm(newSearchTerm);
    }, [searchParams, searchTerm]);

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

                const res = await fetchData('autocorrect', { searchTerm });

                if (res.suggestedTerm.length > 0) {
                    setShowExploreButton(false);
                }

                setSuggestedTerm(res.suggestedTerm);

                //if the user searches by a plural and only singular is stored in the DB
                //need to be returned from the backend because the search needs to be performed on that term 
                if (searchTerm.includes(res.suggestedTerm) && res.suggestedTerm.length > 0) {
                    setSearchTerm(res.suggestedTerm);
                    setShowSuggestedTerm(false);
                    setSuggestedTerm('');
                } else if (res.suggestedTerm && res.suggestedTerm.length > 0) {
                    setShowExploreButton(false);
                    setShowSuggestedTerm(true);
                    setSuggestedTerm(res.suggestedTerm);
                    return;
                } else {
                    setShowSuggestedTerm(false);
                }

                queryParams = {
                    ...queryParams,
                    searchTerm: searchTerm,
                };
                endpoint = 'search';
            } else if (!loadMore) {
                return;
            }

            //setShowSuggestedTerm(false);
            const data = await fetchData(endpoint, queryParams);

            if (data.products.length !== 9) {
                setShowExploreButton(false);
            }

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

                    if (filteredProducts.length < 9) {
                        setShowExploreButton(false);
                    }

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
            if (data.products < 9) {
                setShowExploreButton(false);
            }
        } catch (error) {
            console.error('Search request failed:', error);
        }
    }, [
        searchParams,
        currentPage,
        selectedCategory,
        searchTerm,
        loadMore,
        searchTermCleared,
    ]);

    useEffect(() => {
        fetchMoreProducts();
    }, [searchTerm, currentPage, hasMoreProducts]);

    const handleSuggestedTermClick = useCallback(() => {
        setSearchTerm(suggestedTerm || '');

        if (searchTerm == suggestedTerm) {
            setSuggestedTerm(null);
            setShowSuggestedTerm(false);
        }

        // update query parameters when the suggested term is clicked
        setSearchParams({ searchTerm: suggestedTerm || '' });
    }, [searchTerm, suggestedTerm, searchParams]);

    return (
        <div className="w-2/3 mx-auto pt-12 flex font-lato" id="shop-page-id">
            {showSuggestedTerm && suggestedTerm && (
                <div className="mt-4 pl-1 mb-8 ml-52 flex absolute top-36 ">
                    <div>Did you mean?</div>
                    <div>
                        <button
                            className="ml-2 text-trueIndigo-500 pl-1"
                            onClick={handleSuggestedTermClick}
                        >
                            {suggestedTerm}
                        </button>
                    </div>
                </div>
            )}
            <div className="flex gap-8 pt-6">
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
