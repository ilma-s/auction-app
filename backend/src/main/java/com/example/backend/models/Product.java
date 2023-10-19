package com.example.backend.models;

import lombok.Data;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String productId;

    @ManyToOne
    @JoinColumn(name = "sellerId")
    private AppUser seller;

    private String category;
    private String name;
    private String description;
    private Double startingPrice;
    private Double currentPrice;
    private String startDate;
    private String status;
    private String endDate;
}

