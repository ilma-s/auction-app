import { fetchData } from '../../helpers/apiFunctions';

class CategoryUtils {
    static async fetchCategories() {
        return fetchData('categories');
    }

    static async fetchSubcategories(categoryId: string) {
        return fetchData(`subcategories/${categoryId}`);
    }
}

export default CategoryUtils;
