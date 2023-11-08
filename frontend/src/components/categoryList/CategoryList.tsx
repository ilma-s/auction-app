import { useState, useEffect } from 'react';

import CategoryUtils from '../../utils/entities/CategoryUtils';

import {
    CATEGORIES_STRING,
    ALL_CATEGORIES_STRING,
} from '../../utils/constants';

import { Category } from '../../types';

const CategoryList = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        CategoryUtils.fetchCategories().then((data) => setCategories(data));
    }, []);

    return (
        <div className="w-60 cursor-pointer">
            <div className="font-normal text-trueIndigo-500 pb-8 pl-3">
                {CATEGORIES_STRING}
            </div>

            <div className="pb-32 text-trueGray-800 font-normal w-56">
                {categories.slice(0, 9).map((category) => (
                    <div
                        key={category.categoryId}
                        className="flex h-12 border-b-2 border-true-gray-300 items-center pl-3"
                    >
                        {category.name}
                    </div>
                ))}

                <div className="flex items-center h-12 border-b-2 border-true-gray-300 pl-3">
                    {ALL_CATEGORIES_STRING}
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
