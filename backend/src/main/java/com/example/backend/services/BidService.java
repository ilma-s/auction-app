package com.example.backend.services;

import com.example.backend.dtos.HighestBidDTO;
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
import org.hibernate.Hibernate;
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
    private final BidUtils bidUtils;
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
    public Bid placeBid(BidRequest bidRequest) throws Exception {
        Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());

        if (currentTimestamp.after(productService.getBidTimeEndMap().get(bidRequest.getProductId()))) {
            throw new Exception("Time is up!");
        }
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
            System.out.println("no");
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
    @Scheduled(fixedRate = 1000)
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

    public HighestBidDTO getWinningBid(String productId) {
        Bid winningBid = bidRepository.findWinningBidByProduct(productId);

        HighestBidDTO winningBidDTO = null;

        if (winningBid != null) {
            winningBidDTO = new HighestBidDTO(winningBid);
        }

        return winningBidDTO;
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

    public boolean checkIfWinningBid(BidRequest bidRequest) {
        Bid bid = constructBid(bidRequest);
        return bidUtils.processBid(bid, bid.getProduct());
    }

    private boolean isValidBidAmount(Double bidAmount, String productId) {
        // check if bidAmount is valid by comparing it against the maximum value in the db
        Double maxAllowedBidAmount = bidRepository.findHighestBidByProduct(productId);
        System.out.println("max allowed: " + maxAllowedBidAmount);

        if (maxAllowedBidAmount != null) {
            boolean res = bidAmount.compareTo(maxAllowedBidAmount) > 0;
            System.out.println("bidAmount.compareTo(maxAllowedBidAmount) > 0: " + res);
            return bidAmount.compareTo(maxAllowedBidAmount) > 0;
        } else {
            //no bids placed, check against the price + 1
            boolean res = bidAmount.compareTo(productRepository.getPrice(productId) + 1) > 0;
            System.out.println("res: " + res);
            return bidAmount.compareTo(productRepository.getPrice(productId) + 1) > 0;
        }
    }

}
