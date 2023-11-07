import { useLocation } from 'react-router-dom';

import FilterCategoryList from '../../components/filterCategoryList/FilterCategoryList';
import ProductListInfiniteScroll from '../../components/productListInfiniteScroll/ProductListInfiniteScroll';

const ShopPage = () => {
    const location = useLocation();
    const searchResults = location.state?.searchResults || [];

    return (
        <div className="w-2/3 mx-auto pt-12 flex font-lato">
            <div className="flex gap-8">
                <FilterCategoryList />
                {searchResults.length > 0 ? (
                    <ProductListInfiniteScroll searchResults={searchResults} />
                ) : (
                    <ProductListInfiniteScroll />
                )}
            </div>
        </div>
    );
};

export default ShopPage;
