package com.example.backend.controllers;

import com.example.backend.models.Bid;
import com.example.backend.models.BidRequest;
import com.example.backend.services.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@CrossOrigin(origins = "${frontend_address}")
public class BidController {

    private final BidService bidService;

    @Value("${frontend_address}")
    private String frontend_address;

    @Autowired
    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @ResponseBody
    @PostMapping("/place-bid")
    public ResponseEntity<Map<String, String>> placeBid(@RequestBody BidRequest bidRequest) {
        Bid bid = bidService.placeBid(bidRequest);

        String message;
        if (bid != null) {
            boolean isWinningBid = bidService.checkIfWinningBid(bidRequest);
            message = isWinningBid ? "Winning bid" : "Bid placed successfully";
        } else {
            message = "Bid cannot be placed; multiple identical bids attempted";
        }

        System.out.println("message: " + message);

        Map<String, String> response = new HashMap<>();
        String status = (bid != null) ? "Bid placed successfully" : "Bid not placed";
        response.put("status", status);
        response.put("message", message);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/start-winning-bid-check")
    public ResponseEntity<Map<String, Object>> startWinningBidCheck(@RequestBody BidRequest bidRequest) {
        String userId = getUserIdFromBidRequest(bidRequest);
        String productId = bidRequest.getProductId();

        // Start bid check for the user and product
        CompletableFuture<Boolean> future = bidService.startBidCheck(userId, productId);

        // Wait for the bid check to complete (you might want to add a timeout here)
        boolean isWinning = future.join();

        Map<String, Object> response = new HashMap<>();
        response.put("winningBid", isWinning);

        return ResponseEntity.ok(response);
    }

    private String getUserIdFromBidRequest(BidRequest bidRequest) {
        return bidRequest.getBidderName();
    }

}

