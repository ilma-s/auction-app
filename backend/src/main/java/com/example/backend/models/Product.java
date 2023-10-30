package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String productId;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private AppUser seller;

    private String name;
    private String description;
    private Double startingPrice;
    private Double currentPrice;
    private Timestamp startDate;
    private Timestamp endDate;
    private String status;

    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties("product")
    private List<Image> images;

    public Product(String productId, AppUser sellerId, String name, String description, Double startingPrice, Double currentPrice, Timestamp startDate, Timestamp endDate, String status) {
        this.productId = productId;
        this.seller = sellerId;
        this.name = name;
        this.description = description;
        this.startingPrice = startingPrice;
        this.currentPrice = currentPrice;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }

    @JsonCreator
    public static Product fromJson(
            @JsonProperty("productId") String productId,
            @JsonProperty("seller") AppUser seller,
            @JsonProperty("name") String name,
            @JsonProperty("description") String description,
            @JsonProperty("startingPrice") Double startingPrice,
            @JsonProperty("currentPrice") Double currentPrice,
            @JsonProperty("startDate") Timestamp startDate,
            @JsonProperty("endDate") Timestamp endDate,
            @JsonProperty("status") String status) {

        return new Product(productId, seller, name, description, startingPrice, currentPrice, startDate, endDate, status);
    }

    public Product() {
        this.productId = null;
        this.seller = null;
        this.name = null;
        this.description = null;
        this.startingPrice = null;
        this.currentPrice = null;
        this.startDate = null;
        this.endDate = null;
        this.status = null;
    }
}

