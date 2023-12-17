package com.example.backend.services;

import com.example.backend.repositories.TransactionRepository;
import com.example.backend.utils.StringUtils;
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

import java.sql.Timestamp;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final BidRepository bidRepository;
    private final TransactionRepository transactionRepository;
    private ConcurrentMap<String, Timestamp> bidEndTimesPerProduct = new ConcurrentHashMap<>();

    @Autowired
    public ProductService(ProductRepository productRepository, BidRepository bidRepository, TransactionRepository transactionRepository) {
        this.productRepository = productRepository;
        this.bidRepository = bidRepository;
        this.transactionRepository = transactionRepository;
        this.bidEndTimesPerProduct = initializeBidEndTimesMap();

    }

    private ConcurrentMap<String, Timestamp> initializeBidEndTimesMap() {
        ConcurrentMap<String, Timestamp> bidEndTimesMap = new ConcurrentHashMap<>();

        // Get a list of processed bid product IDs from the Transaction table
        List<String> processedBidIds = transactionRepository.findProcessedBidIds();
        List<String> processedBidProducts = productRepository.findProcessedProductsIds(processedBidIds);

        // Get all products except those with processed bids or products that are already completed
        List<Product> activeProducts = productRepository.findActiveProducts(processedBidProducts);

        for (Product product : activeProducts) {
            Timestamp endDate = product.getEndDate();
            if (endDate != null) {
                bidEndTimesMap.put(product.getProductId(), endDate);
            }
        }

        return bidEndTimesMap;
    }

    public Timestamp getBidEndTime(String productId) {
        return bidEndTimesPerProduct.getOrDefault(productId, null);
    }

    //update the map
    public void updateBidEndTimesForNewProduct(Product newProduct) {
        if (newProduct.getEndDate() != null) {
            bidEndTimesPerProduct.put(newProduct.getProductId(), newProduct.getEndDate());
        }
    }

    //save the product; for now just to explain the usage of the map updating function
    public ResponseEntity<Product> saveProduct(Product product) {
        Product savedProduct = productRepository.save(product);
        updateBidEndTimesForNewProduct(savedProduct);

        return ResponseEntity.ok(savedProduct);
    }

    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return ResponseEntity.ok(products);
    }

    public ConcurrentMap<String, Timestamp> getBidTimeEndMap() {
        return bidEndTimesPerProduct;
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
        Map<String, String> suggestedTermMap = new HashMap<>(); //results map

        boolean isPlural = false;

        Map<String,String> closestMatchByProductName = findClosestMatch(searchTerm, allProductNames);
        Map<String,String> closestMatchByCategory = findClosestMatch(searchTerm, allCategories);

        // Compare the Levenshtein distances and return the map with the smaller distance
        if (Integer.parseInt(closestMatchByProductName.get("minDistance")) < Integer.parseInt(closestMatchByCategory.get("minDistance"))) {
            suggestedTermMap.put("suggestedTerm", closestMatchByProductName.get("closestMatch"));
        } else {
            suggestedTermMap.put("suggestedTerm", closestMatchByCategory.get("closestMatch"));
        }

        if (searchTerm.endsWith("ies")) {
            searchTerm = searchTerm.substring(0, searchTerm.length() - 3) + "y";
            isPlural = true;
        } else if (searchTerm.endsWith("s")) {
            searchTerm = searchTerm.substring(0, searchTerm.length() - 1);
            isPlural = true;
        }

        suggestedTermMap.put("isPlural", String.valueOf(isPlural));

        String categoryMatch = StringUtils.checkPluralForms(searchTerm, allCategories);
        String productMatch = StringUtils.checkPluralForms(searchTerm, allProductNames);

        boolean isSearchValid = !categoryMatch.isEmpty() || !productMatch.isEmpty();

        if(isSearchValid) {
            String suggestedTerm = "";
            if (!categoryMatch.isEmpty()) suggestedTerm = categoryMatch;
            else if (!productMatch.isEmpty()) suggestedTerm = productMatch;
            suggestedTermMap.put("suggestedTerm", suggestedTerm);
            return suggestedTermMap;
        }

        return suggestedTermMap;
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