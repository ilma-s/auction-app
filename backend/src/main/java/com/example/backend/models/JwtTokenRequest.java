package com.example.backend.models;

import lombok.Data;

@Data
public class JwtTokenRequest {
    private String username;
    private String password;
}
