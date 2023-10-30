package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String imageId;
    private String imageUrl;

    @ManyToOne
    @JsonIgnoreProperties("images")
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

}
