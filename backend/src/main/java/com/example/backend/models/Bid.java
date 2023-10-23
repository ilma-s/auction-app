package com.example.backend.models;

import jakarta.persistence.*;
import java.sql.Timestamp;
import lombok.Data;

@Entity
@Data
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String bidId;
    private Double amount;
    private Timestamp timestamp;

    @ManyToOne
    @JoinColumn(name = "bidderId")
    private AppUser bidder;

    @ManyToOne
    @JoinColumn(name = "productId")
    private Product product;

    @OneToOne(mappedBy = "bid", cascade = CascadeType.ALL, orphanRemoval = true)
    private Transaction transaction_id;
}


