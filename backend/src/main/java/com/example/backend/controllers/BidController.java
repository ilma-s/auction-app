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
        boolean winningBid = bidService.placeBid(bidRequest);
        String message = winningBid ? "Winning bid" : "";

        Map<String, String> response = new HashMap<>();
        response.put("status", "Bid placed successfully");
        response.put("message", message);

        // ako se ne moze place bid jer su 2 ista bida dosla u isto vrijeme, u response vratiti tu cijenu

        return ResponseEntity.ok(response);
    }
}
