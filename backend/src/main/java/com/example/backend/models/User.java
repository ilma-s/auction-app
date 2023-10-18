package com.example.backend.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String userId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private Boolean isAdmin;
}
