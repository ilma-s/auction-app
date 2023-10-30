package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String transactionId;
    private Timestamp timestamp;
    private String status;

    @OneToOne
    @JoinColumn(name = "bid_id", referencedColumnName = "bidId")
    private Bid bidId;
}
