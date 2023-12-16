package com.example.backend.models;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

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

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        Bid otherBid = (Bid) obj;
        return Objects.equals(amount, otherBid.amount) &&
                Objects.equals(timestamp, otherBid.timestamp) &&
                Objects.equals(bidder, otherBid.bidder) &&
                Objects.equals(product, otherBid.product);
    }


}


