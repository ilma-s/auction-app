package com.example.backend.controllers;

import com.example.backend.dtos.ProductSubcategoryResponseDTO;
import com.example.backend.models.Category;
import com.example.backend.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "${frontend_address}", allowedHeaders = "*", allowCredentials = "true")
public class CategoryController {
    private final CategoryService categoryService;

    @Value("${frontend_address}")
    private String frontend_address;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.findCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/subcategories/{categoryId}")
    public ResponseEntity<List<ProductSubcategoryResponseDTO>> getSubcategoriesWithItemCount(@PathVariable String categoryId) {
        List<ProductSubcategoryResponseDTO> subcategoriesWithItemCount = categoryService.findSubcategoriesWithItemCount(categoryId);
        return ResponseEntity.ok(subcategoriesWithItemCount);
    }

}
