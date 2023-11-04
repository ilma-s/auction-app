package com.example.backend.services;

import com.example.backend.models.Product;
import com.example.backend.repositories.BidRepository;
import com.example.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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

    public ResponseEntity<Product> findProduct(String productId) {
        Product result = productRepository.findProduct(productId);
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Map<String, Object>> getProductInfo(String productId) {
        Product product = productRepository.findProduct(productId);

        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        Double highestBid = bidRepository.findHighestBidByProduct(productId);
        Integer numberOfBids = bidRepository.findTotalBidsByProduct(productId);

        // calculate time left
        Date currentDate = new Date();
        long timeLeftMillis = product.getEndDate().getTime() - currentDate.getTime();
        long timeLeftSeconds = timeLeftMillis / 1000;
        String timeLeft = String.format("%d days, %02d:%02d:%02d",
                timeLeftSeconds / (3600 * 24),
                (timeLeftSeconds % (3600 * 24)) / 3600,
                (timeLeftSeconds % 3600) / 60,
                timeLeftSeconds % 60);

        // combine product info and calculated data
        Map<String, Object> combinedInfo = new HashMap<>();
        combinedInfo.put("highestBid", highestBid);
        combinedInfo.put("numberOfBids", numberOfBids);
        combinedInfo.put("timeLeft", timeLeft);

        return ResponseEntity.ok(combinedInfo);
    }
}