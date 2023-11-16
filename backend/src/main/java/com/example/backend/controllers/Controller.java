package com.example.backend.controllers;

import com.example.backend.dtos.BidInfoResponse;
import com.example.backend.dtos.BidInfoResponse;
import com.example.backend.models.Category;
import com.example.backend.models.Product;
import com.example.backend.services.CategoryService;
import com.example.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "${frontend_address}")
public class Controller {

    private final CategoryService categoryService;
    private final ProductService productService;

    @Value("${frontend_address}")
    private String frontend_address;

    @Autowired
    public Controller(CategoryService categoryService, ProductService productService) {
        this.categoryService = categoryService;
        this.productService = productService;
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Backend running!");
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.findCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/subcategories/{categoryId}")
    public ResponseEntity<List<Object[]>> getSubcategoriesWithItemCount(@PathVariable String categoryId) {
        List<Object[]> subcategoriesWithItemCount = categoryService.findSubcategoriesWithItemCount(categoryId);
        return ResponseEntity.ok(subcategoriesWithItemCount);
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/closest-product")
    public ResponseEntity<Product> getClosestProduct() {
        return productService.findProductWithClosestEndDate();
    }

    @GetMapping("/new-arrivals")
    public ResponseEntity<List<Product>> getNewArrivals() {
        return productService.findNewArrivals();
    }

    @GetMapping("/last-chance")
    public ResponseEntity<List<Product>> getLastChanceProducts() {
        return productService.findLastChanceProducts();
    }

    @GetMapping("/shop/item")
    public ResponseEntity<Product> findProduct(@RequestParam("product_id") String productId) {
        return productService.findProduct(productId);
    }

    @GetMapping(value = "/bid-info", produces = "application/json")
    public ResponseEntity<BidInfoResponse> getBidInfo(@RequestParam("product_id") String productId) {
        return productService.getBidInfo(productId);
    }

    @GetMapping("/all-products")
    public ResponseEntity<Map<String, Object>> getAllProductsPaged(
            @RequestParam("limit") int limit,
            @RequestParam("offset") int offset) {
        int page = offset / limit;
        Page<Product> productsPage = productService.getAllProductsPaged(limit, page);

        Map<String, Object> response = new HashMap<>();
        response.put("products", productsPage.getContent());
        response.put("totalProducts", productsPage.getTotalElements());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchProductsPaged(
            @RequestParam("searchTerm") String searchTerm,
            @RequestParam("limit") int limit,
            @RequestParam("offset") int offset) {

        int page = offset / limit;
        Page<Product> searchResultsPage = productService.searchProductsPaged(searchTerm, limit, page);

        Map<String, Object> response = new HashMap<>();
        response.put("currentPage", searchResultsPage.getNumber());
        response.put("pageSize", searchResultsPage.getSize());
        response.put("totalResults", searchResultsPage.getTotalElements());
        response.put("products", searchResultsPage.getContent());

        return ResponseEntity.ok(response);
    }
}