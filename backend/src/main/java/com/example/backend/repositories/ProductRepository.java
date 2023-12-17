package com.example.backend.repositories;

import com.example.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
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

    @Query("SELECT p FROM Product p ORDER BY p.productId ASC")
    Page<Product> getAllProductsPaged(Pageable pageable);


    @Query("SELECT DISTINCT p FROM Product p " +
            "JOIN p.categories pc " +
            "JOIN pc.category c " +
            "JOIN c.parentCategory pcParent " +
            "WHERE lower(p.name) LIKE lower(concat('%', :searchTerm, '%')) " +
            "OR lower(c.name) LIKE lower(concat('%', :searchTerm, '%')) " +
            "OR lower(pcParent.name) LIKE lower(concat('%', :searchTerm, '%'))")
    Page<Product> searchProductsPaged(@Param("searchTerm") String searchTerm, Pageable pageable);

    @Query("SELECT LOWER(p.name) FROM Product p")
    List<String> getAllProductNames();

    @Query("SELECT LOWER(c.name) FROM Product p JOIN p.categories pc JOIN pc.category c")
    List<String> getAllCategories();

    @Query("SELECT p.productId FROM Product p, Bid b WHERE b.product.productId = p.productId AND b.bidId IN :processedBidProductIds")
    List<String> findProcessedProductsIds(List<String> processedBidProductIds);

    @Query("SELECT p FROM Product p WHERE p.productId NOT IN :processedBidProductIds AND p.endDate > CURRENT_TIMESTAMP")
    List<Product> findActiveProducts(List<String> processedBidProductIds);
}