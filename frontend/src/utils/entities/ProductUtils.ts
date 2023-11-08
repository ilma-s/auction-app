import {
    NEW_ARRIVALS_STRING,
    NEW_ARRIVALS_URL_STRING,
    LAST_CHANCE_STRING,
    LAST_CHANCE_URL_STRING,
    RELATED_PRODUCTS_STRING,
    RELATED_PRODUCTS_URL_STRING,
} from '../constants';

import { fetchData } from '../../helpers/apiFunctions';
import { Product } from '../../types';
import CategoryUtils from './CategoryUtils';

class ProductUtils {
    static async fetchClosestProduct() {
        return fetchData('closest-product');
    }

    static async fetchProducts(selectedSection: string, categoryId?: string) {
        const endpoints: Record<string, string> = {
            [NEW_ARRIVALS_STRING]: NEW_ARRIVALS_URL_STRING,
            [LAST_CHANCE_STRING]: LAST_CHANCE_URL_STRING,
            [RELATED_PRODUCTS_STRING]: `${RELATED_PRODUCTS_URL_STRING}?categoryId=${categoryId}`,
        };

        const endpoint = endpoints[selectedSection];

        return fetchData(endpoint);
    }

    static async fetchLimitedProducts(productsToLoad: number, offset: number) {
        try {
            const response = await fetchData('all-products', {
                limit: productsToLoad.toString(),
                offset: offset.toString(),
            });
            console.log(productsToLoad.toString());
            console.log(offset.toString());

            if (response && Array.isArray(response.products)) {
                console.log(response);
                return response;
            } else {
                throw new Error(
                    'Failed to fetch products or invalid response format',
                );
            }
        } catch (error) {
            console.error('Error fetching products', error);
            throw error;
        }
    }

    static async fetchProduct(productId: string) {
        return fetchData('shop/item', { product_id: productId });
    }

    static async filterProductsByCategories(
        products: Product[],
        selectedCategory: string,
    ) {
        const subcategories = await CategoryUtils.fetchSubcategories(
            selectedCategory,
        );
        const subcategoryNames = subcategories.map(
            (subcategory: [string, string, number]) => subcategory[1],
        );

        const filteredProducts = products.filter((product) => {

            const matchedCategory = product.categories.some(
                (productCategory) => {
                    const categoryMatched =
                        productCategory.name === selectedCategory ||
                        subcategoryNames.includes(
                            productCategory.category?.name,
                        );

                    return categoryMatched;
                },
            );

            return matchedCategory;
        });

        return filteredProducts;
    }
}

export default ProductUtils;
