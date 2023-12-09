package com.example.backend.services;

import com.example.backend.auth.JwtUtil;
import com.example.backend.models.AppUser;
import com.example.backend.models.JwtTokenRequest;
import com.example.backend.models.JwtTokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    public JwtTokenResponse authenticate(JwtTokenRequest tokenRequest) {
        try {
            String identifier = tokenRequest.getIdentifier();

            AppUser appUser = userService.findUserByEmailOrUsername(identifier);

            if (appUser == null) {
                throw new UsernameNotFoundException("User not found with the provided identifier");
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(appUser.getUsername(), tokenRequest.getPassword()));

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            String accessToken = jwtUtil.createAccessToken((AppUser) userDetails);
            String refreshToken = jwtUtil.createRefreshToken((AppUser) userDetails);

            return new JwtTokenResponse(accessToken, refreshToken);
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

                return new JwtTokenResponse(newAccessToken, newRefreshToken);
            } else {
                throw new AuthenticationServiceException("Invalid refresh token");
            }
        } catch (Exception e) {
            throw new AuthenticationServiceException("Error refreshing access token", e);
        }
    }
}

