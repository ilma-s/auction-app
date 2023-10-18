package com.example.backend.models;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String userId; //uuid
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private Boolean isAdmin;
}
