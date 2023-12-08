package com.example.backend.utils;

import com.example.backend.models.Bid;
import com.example.backend.models.BidRequest;
import com.example.backend.models.Product;
import com.example.backend.models.Transaction;
import com.example.backend.repositories.BidRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Component
public class BidUtils {

    @Autowired
    private BidRepository bidRepository;

    @Transactional
    public boolean processBid(Bid bid, Product product) {
        // Check if the auction has ended (endDate is in the past)
        if (product.getEndDate().before(Timestamp.valueOf(LocalDateTime.now()))) {
            // Find the highest bid for the product
            Bid winningBid = bidRepository.findLatestBidByProductId(product.getProductId());

            if (bid.getAmount() < winningBid.getAmount()) return false;

            // Create and set the transaction for the winning bid
            Transaction transaction = new Transaction();
            transaction.setTimestamp(Timestamp.valueOf(LocalDateTime.now()));
            transaction.setStatus("BID WON"); // You may need to define statuses based on your requirements
            bid.setTransaction(transaction);

            // Save the updated bid with the transaction
            bidRepository.save(bid);

            return true;
        }

        return false;
    }
}

