import { fetchData } from '../../helpers/apiFunctions';

class CategoryUtils {
    /**
     * Fetches the list of categories from the backend.
     * 
     * @returns {Promise<Array>} A promise that resolves to the array of categories.
     */
    static async fetchCategories() {
        return fetchData('categories');
    }

    /**
     * Fetches the subcategories for a given category from the backend.
     * 
     * @param {string} categoryId - The identifier of the category to fetch subcategories for.
     * @returns {Promise<Array>} A promise that resolves to the array of subcategories.
     */
    static async fetchSubcategories(categoryId: string) {
        return fetchData(`subcategories/${categoryId}`);
    }
}

export default CategoryUtils;

