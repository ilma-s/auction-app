import {
    NEW_ARRIVALS_STRING,
    LAST_CHANCE_STRING,
    RELATED_PRODUCTS_STRING,
    BACKEND_URL_STRING,
} from '../utils/constants';

async function fetchData(endpoint: string): Promise<any> {
    try {
        const response = await fetch(`${BACKEND_URL_STRING}/${endpoint}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return null;
    }
}

export async function fetchCategories() {
    return fetchData('categories');
}

export async function fetchClosestProduct() {
    return fetchData('closest-product');
}

export async function fetchProducts(
    selectedSection: string,
    categoryId?: string,
) {
    const endpoints: Record<string, string> = {
        [NEW_ARRIVALS_STRING]: 'new-arrivals',
        [LAST_CHANCE_STRING]: 'last-chance',
        [RELATED_PRODUCTS_STRING]: `related-products?categoryId=${categoryId}`,
    };

    const endpoint = endpoints[selectedSection];

    return fetchData(endpoint);
}
