import minusSign from './assets/minus-sign.svg';
import plusSign from './assets/plus-sign.svg';

import { useState, useEffect } from 'react';

import CategoryUtils from '../../utils/entities/CategoryUtils';

import { PRODUCT_CATEGORIES_STRING } from '../../utils/constants';

import { Category } from '../../types';

interface FilterCategoryListProps {
    selectedCategory: string | null;
}

// define types for subcategory data
type SubcategoryData = [string, string, number];

const initialSubcategoriesState: {
    [categoryId: string]: {
        subcategoryName: string;
        subcategoryItemCount: number;
    }[];
} = {};

const transformSubcategoriesWithItemCount = (
    data: SubcategoryData[],
): { subcategoryName: string; subcategoryItemCount: number }[] => {
    const subcategoriesArray: {
        subcategoryName: string;
        subcategoryItemCount: number;
    }[] = [];

    data.forEach((subcategory) => {
        const subcategoryName = subcategory[1];
        const subcategoryItemCount = subcategory[2];
        subcategoriesArray.push({ subcategoryName, subcategoryItemCount });
    });

    return subcategoriesArray;
};

const FilterCategoryList = ({ selectedCategory }: FilterCategoryListProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [subcategories, setSubcategories] = useState<{
        [categoryId: string]: {
            subcategoryName: string;
            subcategoryItemCount: number;
        }[];
    }>(initialSubcategoriesState);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<{
        [key: string]: string[];
    }>({});

    useEffect(() => {
        CategoryUtils.fetchCategories().then((data) => setCategories(data));
    }, []);

    const toggleCategoryExpansion = (categoryId: string) => {
        if (expandedCategories.includes(categoryId)) {
            // collapse the category, clear its checkboxes, and remove it from the expanded categories
            setSubcategories((prevSubcategories) => {
                const updatedSubcategories = { ...prevSubcategories };
                delete updatedSubcategories[categoryId];
                return updatedSubcategories;
            });
            setSelectedCheckboxes((prevSelectedCheckboxes) => {
                const updatedCheckboxes = { ...prevSelectedCheckboxes };
                delete updatedCheckboxes[categoryId];
                return updatedCheckboxes;
            });
            setExpandedCategories(
                expandedCategories.filter((id) => id !== categoryId),
            );
        } else {
            CategoryUtils.fetchSubcategories(categoryId).then((data) => {
                const transformedSubcategories: {
                    subcategoryName: string;
                    subcategoryItemCount: number;
                }[] = transformSubcategoriesWithItemCount(data);

                setSubcategories((prevSubcategories) => {
                    return {
                        ...prevSubcategories,
                        [categoryId]: transformedSubcategories,
                    };
                });
            });
            setExpandedCategories([...expandedCategories, categoryId]);
        }
    };

    const handleCheckboxChange = (
        categoryId: string,
        subcategoryId: string,
    ) => {
        setSelectedCheckboxes((prevSelectedCheckboxes) => {
            const updatedCheckboxes = { ...prevSelectedCheckboxes };
            if (updatedCheckboxes[categoryId]) {
                // check if the subcategory is already selected
                const index =
                    updatedCheckboxes[categoryId].indexOf(subcategoryId);
                if (index !== -1) {
                    // if it's already selected, remove it
                    updatedCheckboxes[categoryId].splice(index, 1);
                } else {
                    // if it's not selected, add it
                    updatedCheckboxes[categoryId].push(subcategoryId);
                }
            } else {
                // if no checkboxes are selected for this category, create a new array
                updatedCheckboxes[categoryId] = [subcategoryId];
            }
            return updatedCheckboxes;
        });
    };

    return (
        <div className="w-60 border-2 pl-6 pr-6 h-fit">
            <div className="font-normal text-trueIndigo-500 pb-8 pt-3">
                {PRODUCT_CATEGORIES_STRING}
            </div>
            <div className="pb-3 text-trueGray-800 font-normal w-56">
                {categories.slice(0, 9).map((category) => (
                    <div key={category.categoryId}>
                        <div
                            className="flex justify-between h-12 items-center pr-8 cursor-pointer"
                            onClick={() =>
                                toggleCategoryExpansion(category.categoryId)
                            }
                        >
                            <div className="font-bold pb-8 pt-8">
                                {category.name}
                            </div>
                            <img
                                src={
                                    expandedCategories.includes(
                                        category.categoryId,
                                    )
                                        ? minusSign
                                        : plusSign
                                }
                                alt={
                                    expandedCategories.includes(
                                        category.categoryId,
                                    )
                                        ? '-'
                                        : '+'
                                }
                            />
                        </div>
                        <div className="pl-6">
                            {expandedCategories.includes(category.categoryId) &&
                                subcategories[category.categoryId] &&
                                subcategories[category.categoryId].map(
                                    (subcategory) => (
                                        <div
                                            key={subcategory.subcategoryName}
                                            className="pt-1 pb-3 pl-2 flex items-center relative"
                                        >
                                            <input
                                                type="checkbox"
                                                id={subcategory.subcategoryName}
                                                name={
                                                    subcategory.subcategoryName
                                                }
                                                checked={
                                                    selectedCheckboxes[
                                                        category.categoryId
                                                    ]?.includes(
                                                        subcategory.subcategoryName,
                                                    ) || false
                                                }
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        category.categoryId,
                                                        subcategory.subcategoryName,
                                                    )
                                                }
                                                className="peer hidden"
                                            />
                                            <label
                                                htmlFor={
                                                    subcategory.subcategoryName
                                                }
                                                className="cursor-pointer relative"
                                            >
                                                <div className="w-4 h-4 border-2 border-trueIndigo-500 rounded-sm"></div>
                                                {selectedCheckboxes[
                                                    category.categoryId
                                                ]?.includes(
                                                    subcategory.subcategoryName,
                                                ) && (
                                                    <svg
                                                        className="w-4 h-4 text-trueIndigo-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                )}
                                            </label>
                                            <label
                                                htmlFor={
                                                    subcategory.subcategoryName
                                                }
                                                className="ml-2 cursor-pointer"
                                            >
                                                {subcategory.subcategoryName} (
                                                {
                                                    subcategory.subcategoryItemCount
                                                }
                                                )
                                            </label>
                                        </div>
                                    ),
                                )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterCategoryList;
