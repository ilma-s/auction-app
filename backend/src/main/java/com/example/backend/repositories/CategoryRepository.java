package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.Date;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT c.name " +
            "FROM Category c " +
            "WHERE c.parentCategory.categoryId = null " +
            "ORDER BY c.name ASC")
    ArrayList<String> findMainCategories();

    @Query("SELECT c.name " +
            "FROM Category c " +
            "WHERE c.parentCategory.categoryId != null " +
            "GROUP BY c.parentCategory.categoryId " +
            "ORDER BY c.name ASC")
    ArrayList<String> findSubcategories();
}

