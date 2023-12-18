package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bidder_id")
    @JsonIgnoreProperties("bidder_id")
    private AppUser bidder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    @JsonIgnoreProperties("product_id")
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


