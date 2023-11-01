package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // ...
}

