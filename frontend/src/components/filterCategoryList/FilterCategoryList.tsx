import minusSign from './assets/minus-sign.svg';
import plusSign from './assets/plus-sign.svg';

import { useState, useEffect } from 'react';

import CategoryUtils from '../../utils/entities/CategoryUtils';

import { PRODUCT_CATEGORIES_STRING } from '../../utils/constants';

import { Category } from '../../types';

import { Subcategory } from '../../types';

interface FilterCategoryListProps {
    selectedCategory: string | null;
}

const FilterCategoryList = ({ selectedCategory }: FilterCategoryListProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    const [subcategories, setSubcategories] = useState<{
        [key: string]: Subcategory[];
    }>({});

    const [selectedCheckboxes, setSelectedCheckboxes] = useState<{
        [key: string]: boolean;
    }>({});

    useEffect(() => {
        CategoryUtils.fetchCategories().then((data) => setCategories(data));
    }, []);

    // expand the selected category when the user navigates to it
    useEffect(() => {
        if (selectedCategory) {
            const matchingCategory = categories.find(
                (category) => category.categoryId === selectedCategory,
            );
            if (matchingCategory) {
                toggleCategoryExpansion(matchingCategory.categoryId);
            }
        }
    }, [selectedCategory, categories]);

    const toggleCategoryExpansion = (categoryId: string) => {
        if (expandedCategories.includes(categoryId)) {
            // collapse the category, clear its checkboxes, and remove it from the expanded categories
            setSubcategories((prevSubcategories) => {
                const updatedSubcategories = { ...prevSubcategories };
                delete updatedSubcategories[categoryId];
                return updatedSubcategories;
            });

            //what is the desired behavior?
            //kada se zatvori dropdown, da li se zadrzavaju checked boxes?
            // setSelectedCheckboxes((prevSelectedCheckboxes) => {
            //     const updatedCheckboxes = { ...prevSelectedCheckboxes };
            //     delete updatedCheckboxes[categoryId];
            //     return updatedCheckboxes;
            // });

            setExpandedCategories(
                expandedCategories.filter((id) => id !== categoryId),
            );
        } else {
            CategoryUtils.fetchSubcategories(categoryId).then((data) => {
                CategoryUtils.transformSubcategoriesWithItemCount(
                    categoryId,
                    data,
                ).then((transformedSubcategories) => {
                    setSubcategories((prevSubcategories) => {
                        return {
                            ...prevSubcategories,
                            [categoryId]: transformedSubcategories,
                        };
                    });

                    setExpandedCategories([...expandedCategories, categoryId]);
                });
            });
        }
    };

    const handleCheckboxChange = (subcategoryId: string) => {
        setSelectedCheckboxes((prevSelectedCheckboxes) => {
            // Create a copy of the previous state
            const updatedCheckboxes = { ...prevSelectedCheckboxes };

            // Toggle the value for the subcategoryId
            updatedCheckboxes[subcategoryId] =
                !updatedCheckboxes[subcategoryId];

            return updatedCheckboxes;
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
                                subcategories[category.categoryId] &&
                                subcategories[category.categoryId].map(
                                    (subcategory) => (
                                        <div
                                            key={`${subcategory.subcategoryId}`}
                                            className="pt-1 pb-3 pl-2 flex items-center relative"
                                        >
                                            <input
                                                type="checkbox"
                                                id={subcategory.subcategoryId}
                                                name={subcategory.subcategoryId}
                                                checked={
                                                    selectedCheckboxes[
                                                        subcategory
                                                            .subcategoryId
                                                    ] || false
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
                                                {selectedCheckboxes[
                                                    subcategory.subcategoryId
                                                ] && (
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
