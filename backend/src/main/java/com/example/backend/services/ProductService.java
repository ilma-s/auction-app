package com.example.backend.services;

import com.example.backend.models.Product;
import com.example.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return ResponseEntity.ok(products);
    }

    public ResponseEntity<Product> findProductWithClosestEndDate() {
        Date currentDate = new Date();
        Product result = productRepository.findProductWithClosestEndDate(currentDate);
        return ResponseEntity.ok(result);
    }

    public ResponseEntity<List<Product>> findNewArrivals() {
        Date currentDate = new Date();
        List<Product> result = productRepository.findNewArrivals(currentDate);
        return ResponseEntity.ok(result);
    }

    public ResponseEntity<List<Product>> findLastChanceProducts() {
        Date currentDate = new Date();
        List<Product> result = productRepository.findLastChanceProducts(currentDate);
        return ResponseEntity.ok(result);
    }

    public ResponseEntity<Product> findProduct(String productId) {
        Product result = productRepository.findProduct(productId);
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}