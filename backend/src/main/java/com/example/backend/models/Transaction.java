package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String transactionId;
    private String timestamp;
    private String status;

    @OneToOne
    @JoinColumn(name = "bid_id", referencedColumnName = "bidId")
    private Bid bid;
}
