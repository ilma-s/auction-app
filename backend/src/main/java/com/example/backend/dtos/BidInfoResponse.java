package com.example.backend.dtos;

import lombok.Data;

@Data
public class BidInfoResponse {
    private Double highestBid;
    private Integer numberOfBids;
    private String timeLeft;

    public BidInfoResponse(Double highestBid, Integer numberOfBids, String timeLeft) {
        this.highestBid = highestBid;
        this.numberOfBids = numberOfBids;
        this.timeLeft = timeLeft;
    }
}

