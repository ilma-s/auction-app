import {
    NEW_ARRIVALS_STRING,
    NEW_ARRIVALS_URL_STRING,
    LAST_CHANCE_STRING,
    LAST_CHANCE_URL_STRING,
    RELATED_PRODUCTS_STRING,
    RELATED_PRODUCTS_URL_STRING,
} from '../constants';

import { fetchData } from '../../helpers/apiFunctions';

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
        return fetchData(`item/${productId}`);
    }
}

export default ProductUtils;
