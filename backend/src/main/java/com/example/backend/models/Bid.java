package com.example.backend.models;

import jakarta.persistence.*;
import java.sql.Timestamp;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Data
public class Bid {
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Id
    private String bidId;

    private Double amount;
    private Timestamp timestamp;

    @ManyToOne
    @JoinColumn(name = "bidder_id")
    private AppUser bidder;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToOne(mappedBy = "bid", cascade = CascadeType.ALL, orphanRemoval = true)
    private Transaction transaction;

}


