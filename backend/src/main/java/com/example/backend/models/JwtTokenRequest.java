package com.example.backend.models;

import lombok.Data;

@Data
public class JwtTokenRequest {
    private String identifier;
    private String password;
    private boolean rememberMe;
    private String refreshToken;
}
