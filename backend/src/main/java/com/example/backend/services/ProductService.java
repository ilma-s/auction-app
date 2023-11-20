package com.example.backend.services;

import com.example.backend.dtos.BidInfoResponse;
import com.example.backend.models.Product;
import com.example.backend.repositories.BidRepository;
import com.example.backend.repositories.ProductRepository;
import com.example.backend.utils.LevenshteinDistanceCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

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

    public Page<Product> searchProductsPaged(String searchTerm, int limit, int offset) {
        int page = offset / limit;
        Pageable pageable = PageRequest.of(page, limit);

        return productRepository.searchProductsPaged(searchTerm.toLowerCase(), pageable);
    }

    public Map<String, String> searchProductsByLevenshteinDistance(String searchTerm) {
        List<String> allProductNames = productRepository.getAllProductNames();
        List<String> allCategories = productRepository.getAllCategories();

        // Check if the user's input is similar to any category
        boolean isSearchValid = allCategories.stream()
                .anyMatch(category -> containsWord(searchTerm, category));

        if (isSearchValid) {
            // If the user's input is similar to any category, return an empty string
            return Map.of("suggestedTerm", "");
        }

        // Check if the user's input is similar to any word in the product names
        for (String productName : allProductNames) {
            String[] wordsInName = productName.split(" ");

            for (String word : wordsInName) {
                if (containsWord(searchTerm, word)) {
                    // If the user's input is similar to any word in the product names, return an empty string
                    return Map.of("suggestedTerm", "");
                }
            }
        }

        // If the user's input is not similar to any categories or words in product names, find the closest match
        Map<String,String> closestMatchByProductName = findClosestMatch(searchTerm, allProductNames);
        Map<String,String> closestMatchByCategory = findClosestMatch(searchTerm, allCategories);

        // Compare the Levenshtein distances and return the map with the smaller distance
        Map<String, String> suggestedTermMap = new HashMap<>();
        if (Integer.parseInt(closestMatchByProductName.get("minDistance")) < Integer.parseInt(closestMatchByCategory.get("minDistance"))) {
            suggestedTermMap.put("suggestedTerm", closestMatchByProductName.get("closestMatch"));
        } else {
            suggestedTermMap.put("suggestedTerm", closestMatchByCategory.get("closestMatch"));
        }

        return suggestedTermMap;
    }


    private boolean containsWord(String searchTerm, String text) {
        return text.toLowerCase().contains(searchTerm.toLowerCase());
    }

    private Map<String,String> findClosestMatch(String userInput, List<String> options) {
        String closestMatch = userInput;
        int minDistance = Integer.MAX_VALUE;

        for (String option : options) {
            String[] wordsInOption = option.split(" ");

            for (String word : wordsInOption) {
                int distance = LevenshteinDistanceCalculator.calculate(userInput, word);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestMatch = word;
                }
            }
        }

        Map<String, String> result = new HashMap<>();
        result.put("closestMatch", closestMatch);
        result.put("minDistance", String.valueOf(minDistance));

        return result;
    }
}