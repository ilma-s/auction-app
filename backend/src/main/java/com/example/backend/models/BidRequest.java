package com.example.backend.models;

import lombok.Data;

@Data
public class BidRequest {
    private double amount;
    private String bidderName;
    private String productId;
}
