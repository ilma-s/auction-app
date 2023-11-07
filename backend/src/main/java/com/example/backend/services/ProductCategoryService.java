package com.example.backend.services;

import com.example.backend.models.Product;
import com.example.backend.repositories.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;

    @Autowired
    public ProductCategoryService(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }


    public List<Product> findProductsBySubcategory(String subcategoryId) {
        return productCategoryRepository.findProductsBySubcategory(subcategoryId);
    }
}

