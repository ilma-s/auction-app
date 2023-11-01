package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
    // ...
}

