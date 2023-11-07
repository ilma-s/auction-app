package com.example.backend.repositories;

import com.example.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.ProductCategory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    @Query("SELECT pc.product FROM ProductCategory pc " +
            "WHERE pc.category.categoryId = :subcategoryId")
    List<Product> findProductsBySubcategory(@Param("subcategoryId") String subcategoryId);

}

