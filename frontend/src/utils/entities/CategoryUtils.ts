import { fetchData } from '../../helpers/apiFunctions';
import { Subcategory } from '../../types';

class CategoryUtils {
    static async fetchCategories() {
        return fetchData('categories');
    }

    static async fetchSubcategories(categoryId: string) {
        return fetchData(`subcategories/${categoryId}`);
    }

    static async transformSubcategoriesWithItemCount(
        categoryID: string,
        data: Subcategory[],
    ): Promise<Subcategory[]> {
        const subcategoriesArray: Subcategory[] = [];

        data.forEach((subcategoryData) => {
            if (Array.isArray(subcategoryData) && subcategoryData.length >= 3) {
                const [subcategoryId, subcategoryName, subcategoryItemCount] =
                    subcategoryData;

                const subcategory: Subcategory = {
                    categoryId: categoryID,
                    subcategoryId: subcategoryId,
                    subcategoryName: subcategoryName,
                    subcategoryItemCount: subcategoryItemCount,
                };

                subcategoriesArray.push(subcategory);
            } else {
                console.error('Invalid subcategoryData:', subcategoryData);
            }
        });

        return subcategoriesArray;
    }
}

export default CategoryUtils;
