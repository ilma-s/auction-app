import { useState, useEffect } from 'react';

import minusSign from './assets/minus-sign.svg';
import plusSign from './assets/plus-sign.svg';

import CategoryUtils from '../../utils/entities/CategoryUtils';
import { PRODUCT_CATEGORIES_STRING } from '../../utils/constants';
import { Category, Subcategory } from '../../types';

interface FilterCategoryListProps {
    selectedCategory: string | null;
}

const FilterCategoryList = ({ selectedCategory }: FilterCategoryListProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

    // fetching categories from the backend when the component mounts
    useEffect(() => {
        CategoryUtils.fetchCategories().then((data) => setCategories(data));
    }, []);

    /**
     * Handles the automatic expansion of the selected category in the user interface.
     * If a selected category exists, it finds the corresponding category object, and
     * triggers the expansion using the `toggleCategoryExpansion` function.
     *
     * @param {string} selectedCategory - the identifier of the selected category
     * @param {Category[]} categories - the list of available categories
     */
    useEffect(() => {
        if (selectedCategory) {
            // find the category object that matches the selected category
            const matchingCategory = categories.find(
                (category) => category.categoryId === selectedCategory,
            );

            if (matchingCategory) {
                // expand the found category in the UI
                toggleCategoryExpansion(matchingCategory.categoryId);
            }
        }
    }, [selectedCategory, categories]);

    /**
     * Toggles the expansion state of a category in the UI and manages the associated subcategories.
     * If the category is expanded, it collapses it. If it's collapsed, it fetches subcategories and expands it.
     *
     * @param {string} categoryId - the identifier of the category to toggle
     */
    const toggleCategoryExpansion = (categoryId: string) => {
        setSubcategories((prevSubcategories) => {
            // check if the category is already expanded
            const isCategoryExpanded = prevSubcategories.some(
                (sub) => sub.categoryId === categoryId,
            );

            if (isCategoryExpanded) {
                // if the category is expanded, collapse it
                setExpandedCategories((prevExpandedCategories) =>
                    prevExpandedCategories.filter((id) => id !== categoryId),
                );
                // remove the subcategories associated with the collapsed category
                return prevSubcategories.filter(
                    (sub) => sub.categoryId !== categoryId,
                );
            } else {
                // if the category is collapsed, fetch subcategories and expand it
                CategoryUtils.fetchSubcategories(categoryId).then((data) => {
                    // add the fetched subcategories to the existing list
                    setSubcategories((prevSubcategories) => [
                        ...prevSubcategories,
                        ...data, // no data transformations needed as the appropriate DTO is sent from the backend
                    ]);
                    // mark the category as expanded
                    setExpandedCategories((prevExpandedCategories) => [
                        ...prevExpandedCategories,
                        categoryId,
                    ]);
                });
            }

            return prevSubcategories;
        });
    };

    /**
     * Handles the change of checkbox state for subcategories.
     * Toggles the 'isChecked' property for the selected subcategory.
     *
     * @param {string} subcategoryId - the identifier of the subcategory to handle
     */
    const handleCheckboxChange = (subcategoryId: string) => {
        setSubcategories((prevSubcategories) => {
            // map through the existing subcategories and toggle the 'isChecked' property for the selected one
            return prevSubcategories.map((sub) => {
                if (sub.subcategoryId === subcategoryId) {
                    return { ...sub, isChecked: !sub.isChecked };
                }
                return sub;
            });
        });
    };

    return (
        <div className="w-60 border-2 pl-6 pr-6 h-fit mb-12">
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
                                subcategories
                                    .filter(
                                        (sub) =>
                                            sub.categoryId ===
                                            category.categoryId,
                                    )
                                    .map((subcategory) => (
                                        <div
                                            key={`${subcategory.subcategoryId}`}
                                            className="pt-1 pb-3 pl-2 flex items-center relative"
                                        >
                                            <input
                                                type="checkbox"
                                                id={subcategory.subcategoryId}
                                                name={subcategory.subcategoryId}
                                                checked={
                                                    subcategory.isChecked ||
                                                    false
                                                }
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        subcategory.subcategoryId,
                                                    )
                                                }
                                                className="peer hidden"
                                            />
                                            <label
                                                htmlFor={
                                                    subcategory.subcategoryId
                                                }
                                                className="cursor-pointer relative"
                                            >
                                                <div className="w-4 h-4 border-2 border-trueIndigo-500 rounded-sm"></div>
                                                {subcategory.isChecked && (
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
                                    ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Exporting the component
export default FilterCategoryList;
