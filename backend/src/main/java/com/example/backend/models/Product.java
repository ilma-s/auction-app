package com.example.backend.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

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
