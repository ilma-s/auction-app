package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.ProductCategory;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    // ...
}

