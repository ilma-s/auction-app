package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    // ...
}

