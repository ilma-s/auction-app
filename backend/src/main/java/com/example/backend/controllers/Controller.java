package com.example.backend.controllers;

import com.example.backend.models.Category;
import com.example.backend.models.Product;
import com.example.backend.services.CategoryService;
import com.example.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "${frontend_address}")
public class Controller {

    private final CategoryService categoryService;
    private final ProductService productService;

    @Value("${frontend_address}")
    private String frontend_address;

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
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
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
}
