package com.example.backend.models;

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
    @JoinColumn(name = "product_id", referencedColumnName = "productId")
    private Product productId;

}
