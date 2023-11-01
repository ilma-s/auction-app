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
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String categoryId;

    private String name;

    @ManyToOne
    @JoinColumn(name = "parent_category_id", referencedColumnName = "categoryId")
    private Category parentCategory;
}
