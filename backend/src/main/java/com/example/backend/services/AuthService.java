package com.example.backend.services;

import com.example.backend.auth.JwtUtil;
import com.example.backend.models.AppUser;
import com.example.backend.models.JwtTokenRequest;
import com.example.backend.models.JwtTokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    private String firstName;

    public JwtTokenResponse authenticate(JwtTokenRequest tokenRequest) {
        try {
            String identifier = tokenRequest.getIdentifier();

            AppUser appUser = userService.findUserByEmailOrUsername(identifier);
            firstName = appUser.getFirstName();

            if (appUser == null) {
                throw new UsernameNotFoundException("User not found with the provided identifier");
            }

            String accessToken = jwtUtil.createAccessToken(appUser);
            String refreshToken = jwtUtil.createRefreshToken(appUser);

            return new JwtTokenResponse(accessToken, refreshToken, firstName);
        } catch (UsernameNotFoundException e) {
            return new JwtTokenResponse();
        } catch (Exception e) {
            System.out.println("Error: " + e);
            return new JwtTokenResponse();
        }
    }

    public JwtTokenResponse refreshAccessToken(String refreshToken) {
        try {
            if (jwtUtil.validateClaims(jwtUtil.parseJwtClaims(refreshToken))) {
                String username = jwtUtil.parseJwtClaims(refreshToken).getSubject();
                UserDetails userDetails = userService.loadUserByUsername(username);

                String newAccessToken = jwtUtil.createAccessToken((AppUser) userDetails);
                String newRefreshToken = jwtUtil.createRefreshToken((AppUser) userDetails);

                return new JwtTokenResponse(newAccessToken, newRefreshToken, firstName);
            } else {
                throw new AuthenticationServiceException("Invalid refresh token");
            }
        } catch (Exception e) {
            throw new AuthenticationServiceException("Error refreshing access token", e);
        }
    }
}