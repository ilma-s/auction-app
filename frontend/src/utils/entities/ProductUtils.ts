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

    static async fetchProduct(productId: string) {
        return fetchData('shop/item', { product_id: productId });
    }

    static async filterProductsByCategories(selectedCategory: string) {
        const products: Product[] = await fetchData('products');

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
                        productCategory.category?.parentCategory?.categoryId === selectedCategory ||
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
