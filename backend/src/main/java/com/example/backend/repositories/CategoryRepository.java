package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findNamesByParentCategoryIsNull();

    @Query("SELECT c.categoryId AS categoryId, c.name AS subcategoryName, COUNT(pc.product.productId) AS itemCount " +
            "FROM Category c " +
            "LEFT JOIN c.productCategories pc " +
            "WHERE c.parentCategory.categoryId = :categoryId " +
            "GROUP BY c.categoryId, c.name")
    List<Object[]> findSubcategoriesWithItemCount(@Param("categoryId") String categoryId);
}

