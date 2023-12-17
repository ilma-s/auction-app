package com.example.backend.repositories;

import com.example.backend.models.Bid;
import com.example.backend.models.Product;
import com.example.backend.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {

    @Query("SELECT t.bid.bidId FROM Transaction t WHERE t.status = 'BID_WON'")
    List<String> findProcessedBidIds();
}
