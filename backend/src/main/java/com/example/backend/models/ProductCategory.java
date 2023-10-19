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
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @ManyToOne
    @JoinColumn(name = "category", referencedColumnName = "categoryId")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "product", referencedColumnName = "productId")
    private Product product;
}
