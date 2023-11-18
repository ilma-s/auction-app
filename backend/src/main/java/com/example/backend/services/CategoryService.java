package com.example.backend.services;

import com.example.backend.dtos.ProductSubcategoryResponseDTO;
import com.example.backend.models.Category;
import com.example.backend.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> findCategories() {
        return categoryRepository.findNamesByParentCategoryIsNull();
    }

    public List<ProductSubcategoryResponseDTO> findSubcategoriesWithItemCount(String categoryId) {
        return categoryRepository.findSubcategoriesWithItemCount(categoryId);
    }
}