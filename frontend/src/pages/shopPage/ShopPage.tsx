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
    const [productsToLoad, setProductsToLoad] = useState(9);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loadMore, setLoadMore] = useState(true);
    const [showExploreButton, setShowExploreButton] = useState(true);
    const initRef = useRef(true);

    const [suggestedTerm, setSuggestedTerm] = useState<string | null>(null);
    const [showSuggestedTerm, setShowSuggestedTerm] = useState(true);
    const [fetchedProductsLength, setFetchedProductsLength] = useState(0);

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

    useEffect(() => {
        setShowExploreButton(true);
    }, [searchTerm]);

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

                setSuggestedTerm(res.suggestedTerm);

                //if the user searches by a plural and only singular is stored in the DB
                //need to be returned from the backend because the search needs to be performed on that term
                if (
                    searchTerm.includes(res.suggestedTerm) &&
                    res.suggestedTerm.length > 0
                ) {
                    setSearchTerm(res.suggestedTerm);
                    setShowSuggestedTerm(false);
                    setSuggestedTerm('');
                } else if (res.suggestedTerm && res.suggestedTerm.length > 0) {
                    console.log('product list: ', allProducts);
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

            const data = await fetchData(endpoint, queryParams);

            if (data.products.length !== 0) {
                let filteredProducts: Product[] = [];

                if (selectedCategory) {
                    filteredProducts =
                        await ProductUtils.filterProductsByCategories(
                            selectedCategory,
                        );
                }

                // Reset the state to an empty array before appending the new results
                setAllProducts((prevAllProducts) => [
                    ...(searchTerm.length > 0 ? [] : prevAllProducts), // Reset if it's a new search
                    ...(filteredProducts.length > 0
                        ? filteredProducts
                        : data.products),
                ]);

                setFetchedProductsLength(
                    filteredProducts.length > 0
                        ? filteredProducts.length
                        : data.products.length,
                );

                if (
                    (filteredProducts.length < productsToLoad &&
                        filteredProducts.length > 0) ||
                    (data.products.length < productsToLoad &&
                        data.products.length > 0)
                ) {
                    setShowExploreButton(false);
                    setLoadMore(false);
                } else {
                    setCurrentPage(currentPage + 1);
                    setLoadMore(false);
                }
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
    }, [searchTerm, currentPage]);

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
                    fetchedProductsLength={fetchedProductsLength}
                    setLoadMore={setLoadMore}
                    showExploreButton={showExploreButton}
                    productsToLoad={productsToLoad}
                    onExploreClick={() => setShowExploreButton(false)}
                />
            </div>
        </div>
    );
};

export default ShopPage;
