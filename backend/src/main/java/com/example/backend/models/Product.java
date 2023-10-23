package com.example.backend.models;

import lombok.Data;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.util.Date;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String productId;

    @ManyToOne
    @JoinColumn(name = "sellerId")
    private AppUser seller;

    private String name;
    private String description;
    private Double startingPrice;
    private Double currentPrice;
    private Date  startDate;
    private String status;
    private Date  endDate;
}

