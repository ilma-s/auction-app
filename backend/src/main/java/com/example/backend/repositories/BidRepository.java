package com.example.backend.repositories;

import com.example.backend.models.Bid;
import com.example.backend.models.Product;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {
    @Query("SELECT MAX(b.amount) FROM Bid b WHERE b.product.productId = :productId")
    Double findHighestBidByProduct(@Param("productId") String productId);

    @Query("SELECT COUNT(b) FROM Bid b WHERE b.product.productId = :productId")
    Integer findTotalBidsByProduct(@Param("productId") String productId);

    @Query("SELECT b FROM Bid b WHERE b.product.productId = :productId AND b.timestamp = (SELECT MAX(b2.timestamp) FROM Bid b2 WHERE b2.product.productId = :productId)")
    Bid findLatestBidByProductId(@Param("productId") String productId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT b FROM Bid b WHERE b.product.productId = :productId AND b.amount = :bidAmount")
    List<Bid> findBidsForUpdate(@Param("productId") String productId, @Param("bidAmount") double bidAmount);
}
