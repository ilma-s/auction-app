package com.example.backend.services;

import com.example.backend.dtos.BidInfoResponse;
import com.example.backend.models.Product;
import com.example.backend.repositories.BidRepository;
import com.example.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final BidRepository bidRepository;


    @Autowired
    public ProductService(ProductRepository productRepository, BidRepository bidRepository) {
        this.productRepository = productRepository;
        this.bidRepository = bidRepository;
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

    public ResponseEntity<Product> findProduct(@RequestParam("product_id") String productId) {
        Product result = productRepository.findProduct(productId);
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    public ResponseEntity<BidInfoResponse> getBidInfo(@RequestParam("product_id") String productId) {
        Product product = productRepository.findProduct(productId);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        Double highestBid = bidRepository.findHighestBidByProduct(productId);
        Integer numberOfBids = bidRepository.findTotalBidsByProduct(productId);

        // Calculate time left
        Date currentDate = new Date();
        long timeLeftMillis = product.getEndDate().getTime() - currentDate.getTime();
        long timeLeftSeconds = timeLeftMillis / 1000;
        String timeLeft = String.format("%d days, %02d:%02d:%02d",
                timeLeftSeconds / (3600 * 24),
                (timeLeftSeconds % (3600 * 24)) / 3600,
                (timeLeftSeconds % 3600) / 60,
                timeLeftSeconds % 60);

        BidInfoResponse response = new BidInfoResponse(highestBid, numberOfBids, timeLeft);

        return ResponseEntity.ok(response);
    }

    public Page<Product> getAllProductsPaged(int limit, int page) {
        Pageable pageable = PageRequest.of(page, limit);
        return productRepository.getAllProductsPaged(pageable);
    }

    public List<Product> searchProducts(String searchTerm) {
        return productRepository.searchProducts(searchTerm.toLowerCase());
    }
}