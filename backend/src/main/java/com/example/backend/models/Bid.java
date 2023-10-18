package com.example.backend.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
@Data
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String bidId; //uuid
    private String bidder;
    private String product;
    private Double amount;
    private String timestamp;
}
