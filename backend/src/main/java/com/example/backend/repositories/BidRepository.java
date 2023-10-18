package com.example.backend.repositories;

import com.example.backend.models.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepository extends JpaRepository<Bid, Long> {
    // You can define custom queries here if needed
}
