package com.example.backend.services;

import com.example.backend.models.AppUser;
import com.example.backend.models.Bid;
import com.example.backend.models.BidRequest;
import com.example.backend.models.Product;
import com.example.backend.models.Transaction;
import com.example.backend.repositories.BidRepository;
import com.example.backend.repositories.ProductRepository;
import com.example.backend.repositories.TransactionRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.utils.BidUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
@EnableScheduling
public class BidService {

    private final BidRepository bidRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private Bid latestBid;
    private BidUtils bidUtils;
    private final TransactionRepository transactionRepository;
    private final ConcurrentHashMap<String, CompletableFuture<Boolean>> userBidFutures = new ConcurrentHashMap<>();
    private final ProductService productService;

    @Autowired
    public BidService(BidRepository bidRepository, UserRepository userRepository, ProductRepository productRepository, BidUtils bidUtils, TransactionRepository transactionRepository, ProductService productService) {
        this.bidRepository = bidRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.bidUtils = bidUtils;
        this.transactionRepository = transactionRepository;
        this.productService = productService;
    }
    @Transactional
    public Bid placeBid(BidRequest bidRequest) {
        // check if the amount of bid placed is greater than the max value in the db
        if (!isValidBidAmount(bidRequest.getAmount(), bidRequest.getProductId())) {
            return new Bid();
            //throw new IllegalArgumentException("Invalid bid amount");
        }

        // use pessimistic write lock to ensure exclusive access
        List<Bid> existingBids = bidRepository.findBidsForUpdate(bidRequest.getProductId(), bidRequest.getAmount());

        // Check if an identical bid already exists
        if (existingBids != null && !existingBids.isEmpty()) {
            // do not proceed with placing the bid
            return null;
        }

        Bid bid = constructBid(bidRequest);
        bidRepository.save(bid);

        return bid;
    }

    public Bid constructBid(BidRequest bidRequest) {
        Bid bid = new Bid();
        bid.setAmount(bidRequest.getAmount());

        LocalDateTime currentDateTime = LocalDateTime.now();
        bid.setTimestamp(Timestamp.valueOf(currentDateTime));

        AppUser bidder = userRepository.findByUsername(bidRequest.getBidderName());
        bid.setBidder(bidder);

        Product product = productRepository.findProduct(bidRequest.getProductId());
        bid.setProduct(product);

        return bid;
    }
    @Scheduled(fixedRate = 5000)
    public void checkWinningBidPeriodically() {
        ConcurrentMap<String, Timestamp> bidEndTimesMap = productService.getBidTimeEndMap();
        System.out.println("periodic check started");

        Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());

        for (Map.Entry<String, Timestamp> entry : bidEndTimesMap.entrySet()) {
            String productId = entry.getKey();
            Timestamp biddingEndTime = entry.getValue();

            if (currentTimestamp.after(biddingEndTime)) {
                // bidding time has ended, process the winning bid
                System.out.println("winning bid found for " + productId);
                processWinningBid(productId);

                // remove the entry from the map
                bidEndTimesMap.remove(productId);
            }
        }
    }

    private void processWinningBid(String productId) {
        Bid winningBid = bidRepository.findWinningBidByProduct(productId);
        Product product = productRepository.findProduct(productId);

        if (winningBid != null && product != null) {
            // Save the winning bid details to the transaction table
            Transaction transaction = new Transaction();
            transaction.setBid(winningBid);
            transaction.setTimestamp(new Timestamp(System.currentTimeMillis()));
            transaction.setStatus("BID_WON");
            transaction.setBid(winningBid);
            transactionRepository.save(transaction);

            System.out.println("Winning bid processed for product: " + productId);
            System.out.println("winning bid: " + winningBid.getBidId());

            // Check if a CompletableFuture exists for this product
            CompletableFuture<Boolean> future = userBidFutures.get(productId);
            if (future != null) {
                // Complete the CompletableFuture with the result (true in this case)
                future.complete(true);

                // Remove the CompletableFuture from the map
                userBidFutures.remove(productId);
            }
        }
    }

    // Method to start bid check for a user
    public CompletableFuture<Boolean> startBidCheck(String userId, String productId) {
        // Cancel the previous CompletableFuture if exists
        cancelBidCheck(userId);

        // Create a new CompletableFuture for the bid check
        CompletableFuture<Boolean> future = new CompletableFuture<>();

        // Store the CompletableFuture in the map
        userBidFutures.put(productId, future);

        return future;
    }

    // Method to cancel the bid check for a user
    public void cancelBidCheck(String userId) {
        // Remove the CompletableFuture for the user
        userBidFutures.remove(userId);
    }

    public boolean checkIfWinningBid(BidRequest bidRequest) {
        Bid bid = constructBid(bidRequest);
        return bidUtils.processBid(bid, bid.getProduct());
    }

    private boolean isValidBidAmount(Double bidAmount, String productId) {
        // check if bidAmount is valid by comparing it against the maximum value in the db
        Double maxAllowedBidAmount = bidRepository.findHighestBidByProduct(productId); // Get the max allowed bid amount from your configuration or database

        // check if maxAllowedBidAmount is not null before performing the comparison
        if (maxAllowedBidAmount != null) {
            return bidAmount.compareTo(maxAllowedBidAmount) > 0;
        } else {
            // if maxAllowedBidAmount is null, consider the bid amount as invalid
            return false;
        }
    }

}
