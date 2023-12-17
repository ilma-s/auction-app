package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Timestamp;

@Entity
@Data
public class Transaction {
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Id
    private String transactionId;
    private Timestamp timestamp;
    private String status;

    @OneToOne
    @JoinColumn(name = "bid_id", referencedColumnName = "bidId")
    private Bid bid;

}
