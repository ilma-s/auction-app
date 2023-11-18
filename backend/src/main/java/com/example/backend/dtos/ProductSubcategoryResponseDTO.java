package com.example.backend.dtos;

import lombok.Data;

@Data
public class ProductSubcategoryResponseDTO {
    private String categoryId;
    private String subcategoryId;
    private String subcategoryName;
    private long subcategoryItemCount;

    public ProductSubcategoryResponseDTO(String categoryId, String subcategoryId, String subcategoryName, long subcategoryItemCount) {
        this.categoryId = categoryId;
        this.subcategoryId = subcategoryId;
        this.subcategoryName = subcategoryName;
        this.subcategoryItemCount = subcategoryItemCount;
    }

}

