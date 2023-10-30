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
    @JoinColumn(name = "bidder_id")
    private AppUser bidder_id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product productId;

    @OneToOne(mappedBy = "bidId", cascade = CascadeType.ALL, orphanRemoval = true)
    private Transaction transactionId;
}


