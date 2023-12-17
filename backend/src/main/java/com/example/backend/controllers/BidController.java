package com.example.backend.controllers;

import com.example.backend.models.Bid;
import com.example.backend.models.BidRequest;
import com.example.backend.services.BidService;
import com.example.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "${frontend_address}")
public class BidController {

    private final BidService bidService;
    private final ProductService productService;

    @Value("${frontend_address}")
    private String frontend_address;

    @Autowired
    public BidController(BidService bidService, ProductService productService) {
        this.bidService = bidService;
        this.productService = productService;
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

    @PostMapping("/get-bid-end-time")
    public ResponseEntity<Map<String, Object>> getBidEndTime(@RequestBody String productId) {
        Timestamp endTime = productService.getBidEndTime(productId);

        Map<String, Object> response = new HashMap<>();
        response.put("endTime", endTime);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/get-winning-bid")
    public ResponseEntity<Map<String, Bid>> getWinningBid(@RequestBody String productId) {
        Bid winningBid = bidService.getWinningBid(productId);

        Map<String, Bid> response = new HashMap<>();
        response.put("winningBid", winningBid);

        return ResponseEntity.ok(response);
    }

}

