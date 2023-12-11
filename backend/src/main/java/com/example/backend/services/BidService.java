package com.example.backend.services;

import com.example.backend.models.AppUser;
import com.example.backend.models.Bid;
import com.example.backend.models.BidRequest;
import com.example.backend.models.Product;
import com.example.backend.repositories.BidRepository;
import com.example.backend.repositories.ProductRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.utils.BidUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
public class BidService {

    private final BidRepository bidRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Autowired
    public BidService(BidRepository bidRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.bidRepository = bidRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }
    @Transactional
    public Bid placeBid(BidRequest bidRequest) {
        // check if the amount of bid placed is greater than the max value in the db
        if (!isValidBidAmount(bidRequest.getAmount(), bidRequest.getProductId())) {
            throw new IllegalArgumentException("Invalid bid amount");
        }

        // use pessimistic write lock to ensure exclusive access
        List<Bid> existingBids = bidRepository.findBidsForUpdate(bidRequest.getProductId(), bidRequest.getAmount());

        // Check if an identical bid already exists
        if (existingBids != null && !existingBids.isEmpty()) {
            // do not proceed with placing the bid
            return null;
        }

        Bid bid = new Bid();
        bid.setAmount(bidRequest.getAmount());

        LocalDateTime currentDateTime = LocalDateTime.now();
        bid.setTimestamp(Timestamp.valueOf(currentDateTime));

        AppUser bidder = userRepository.findByUsername(bidRequest.getBidderName());
        bid.setBidder(bidder);

        Product product = productRepository.findProduct(bidRequest.getProductId());
        bid.setProduct(product);

        bidRepository.save(bid);
        return bid;
    }


    public boolean checkIfWinningBid(Bid bid) {
        BidUtils bidUtils = new BidUtils();
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
