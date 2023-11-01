package com.example.backend.repositories;

import com.example.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Date;

public interface ProductRepository extends JpaRepository<Product, String> {

    @Query("SELECT p FROM Product p " +
            "WHERE p.endDate >= :currentDate " +
            "ORDER BY p.endDate ASC " +
            "LIMIT 1")
    Product findProductWithClosestEndDate(@Param("currentDate") Date currentDate);

    @Query("SELECT p FROM Product p " +
            "WHERE p.startDate <= :currentDate " +
            "ORDER BY p.startDate DESC " +
            "LIMIT 8")
    List<Product> findNewArrivals(@Param("currentDate") Date currentDate);

    @Query("SELECT p FROM Product p " +
            "WHERE p.endDate >= :currentDate " +
            "ORDER BY p.endDate ASC " +
            "LIMIT 8")
    List<Product> findLastChanceProducts(@Param("currentDate") Date currentDate);

    @Query("SELECT p FROM Product p " +
            "WHERE p.productId = :productId")
    Product findProduct(@Param("productId") String productId);
}