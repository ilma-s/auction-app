package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties("product")
    private List<ProductCategory> categories;
}
