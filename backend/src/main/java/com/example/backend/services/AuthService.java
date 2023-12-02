package com.example.backend.services;

import com.example.backend.models.AppUser;
import com.example.backend.models.JwtTokenRequest;
import com.example.backend.models.JwtTokenResponse;
import com.example.backend.repositories.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.security.sasl.AuthenticationException;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.Date;


@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public JwtTokenResponse authenticate(JwtTokenRequest tokenRequest, String requestUrl) throws AuthenticationException {
        // Authenticate user using the provided credentials
        AppUser user = authenticate(tokenRequest.getUsername(), tokenRequest.getPassword());

        // Your existing logic to generate a JWT token
        String generatedToken = generateToken(user.getUsername(), requestUrl);

        return new JwtTokenResponse(generatedToken);
    }

    public AppUser authenticate(String username, String password) throws AuthenticationException {
        // Your authentication logic (e.g., check credentials against database)

        // Retrieve user from the database based on the provided username
        AppUser user = userRepository.findUserByUsername(username);

        // Check if the user exists and the provided password matches the stored hashed password
        if (user != null && passwordMatches(password, user.getPassword())) {
            return user;
        } else {
            // Authentication failed, throw an exception or return null
            throw new AuthenticationException("Invalid credentials");
        }
    }

    private boolean passwordMatches(String rawPassword, String hashedPassword) {
        // Implement logic to check if the raw password matches the hashed password
        // You can use a password hashing library (e.g., BCrypt) for this purpose
        // For example, using BCrypt:
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }

    private String generateToken(String username, String requestUrl) {
        // Your logic to generate a JWT token
        // (Note: You might want to use the user's details from the authenticated user object)
        Instant now = Instant.now();
        ZonedDateTime expirationTime = ZonedDateTime.from(now.plusSeconds(10 * 60)); // Token expires in 10 minutes

        // Replace with a secure secret key
        String SECRET_KEY = "your_secret_key";
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(expirationTime.toInstant()))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
}

