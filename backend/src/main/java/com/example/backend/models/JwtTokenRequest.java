package com.example.backend.models;

import lombok.Data;

@Data
public class JwtTokenRequest {
    private String identifier; //so the user can login with both username and password
    private String password;
    private boolean rememberMe;
}
