package com.example.backend.dtos;

import com.example.backend.models.Bid;
import lombok.Data;

@Data
public class HighestBidDTO {
    private Double amount;
    private String userId;

    public HighestBidDTO(Bid bid) {
        this.amount = bid.getAmount();
        this.userId = bid.getBidder().getUserId();
    }
}
