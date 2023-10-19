package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String bidId;
    private Double amount;
    private String timestamp;

    @ManyToOne
    @JoinColumn(name = "bidderId")
    private AppUser bidder;

    @ManyToOne
    @JoinColumn(name = "productId")
    private Product product;

    @OneToOne(mappedBy = "bid") // This indicates a bid can be associated with a single transaction
    private Transaction transaction;
}

