package com.example.backend.repositories;

import com.example.backend.dtos.ProductSubcategoryResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findNamesByParentCategoryIsNull();

    @Query("SELECT NEW com.example.backend.dtos.ProductSubcategoryResponseDTO(c.parentCategory.categoryId, c.categoryId, c.name, COUNT(pc.product.productId)) " +
            "FROM Category c " +
            "LEFT JOIN c.productCategories pc " +
            "WHERE c.parentCategory.categoryId = :categoryId " +
            "GROUP BY c.parentCategory.categoryId, c.categoryId, c.name")
    List<ProductSubcategoryResponseDTO> findSubcategoriesWithItemCount(@Param("categoryId") String categoryId);
}
