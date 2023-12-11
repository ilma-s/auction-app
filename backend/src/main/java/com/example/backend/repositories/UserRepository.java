package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.AppUser;

public interface UserRepository extends JpaRepository<AppUser, String> {
    AppUser findUserByUsername(String username);
    AppUser findUserByEmail(String email);
}

