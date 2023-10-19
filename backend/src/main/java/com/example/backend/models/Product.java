package com.example.backend.models;

import lombok.Data;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String productId;
    private String seller;
    private String category;
    private String name;
    private String description;
    private Double startingPrice;
    private Double currentPrice;
    private String startDate;
    private String status;
    private String endDate;
}
