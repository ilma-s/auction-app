import { fetchData } from '../../helpers/apiFunctions';

class CategoryUtils {
    static async fetchCategories() {
        return fetchData('categories');
    }
}

export default CategoryUtils;
