package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

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

    @OneToMany(mappedBy = "category")
    @JsonIgnoreProperties("category")
    private List<ProductCategory> productCategories;

}
