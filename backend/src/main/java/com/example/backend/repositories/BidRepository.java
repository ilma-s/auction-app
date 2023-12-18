package com.example.backend.repositories;

import com.example.backend.models.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BidRepository extends JpaRepository<Bid, Long> {
    @Query("SELECT MAX(b.amount) FROM Bid b WHERE b.product.productId = :productId")
    Double findHighestBidByProduct(@Param("productId") String productId);

    @Query("SELECT COUNT(b) FROM Bid b WHERE b.product.productId = :productId")
    Integer findTotalBidsByProduct(@Param("productId") String productId);
}
