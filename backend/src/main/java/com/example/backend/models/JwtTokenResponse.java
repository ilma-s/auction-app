package com.example.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtTokenResponse {
    private String token;
    private String username;

    public JwtTokenResponse(String token) {
        this.token = token;
    }
}
