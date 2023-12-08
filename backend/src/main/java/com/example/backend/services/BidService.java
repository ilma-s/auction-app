package com.example.backend.services;

import com.example.backend.models.AppUser;
import com.example.backend.models.Bid;
import com.example.backend.models.BidRequest;
import com.example.backend.models.Product;
import com.example.backend.repositories.BidRepository;
import com.example.backend.repositories.ProductRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.utils.BidUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public boolean placeBid(BidRequest bidRequest) { //boolean to determine winning bid
        Bid bid = new Bid();

        bid.setAmount(bidRequest.getAmount());
//check if the amount of bid placed is greater than the max value in the db
        LocalDateTime currentDateTime = LocalDateTime.now();
        bid.setTimestamp(Timestamp.valueOf(currentDateTime));

        AppUser bidder = userRepository.findByUsername(bidRequest.getBidderName());
        bid.setBidder(bidder);

        Product product = productRepository.findProduct(bidRequest.getProductId());
        bid.setProduct(product);

        // After saving the bid, process winning bid logic
        BidUtils bidUtils = new BidUtils(); // Create an instance of BidUtils because processWinningBid is not static (has to be transactional)
        if (bidUtils.processBid(bid, product)) {
            return true;
        }

        bidRepository.save(bid);
        return false;

    }
}
