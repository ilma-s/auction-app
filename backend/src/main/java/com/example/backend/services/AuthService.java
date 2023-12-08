package com.example.backend.services;

import com.example.backend.auth.JwtUtil;
import com.example.backend.models.AppUser;
import com.example.backend.models.JwtTokenRequest;
import com.example.backend.models.JwtTokenResponse;
import com.example.backend.repositories.UserRepository;
import com.example.backend.utils.RegistrationUtil;
import jakarta.servlet.Registration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
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
            // check if the identifier is a valid email or username
            String identifier = tokenRequest.getIdentifier();

            AppUser appUser = UserService.findUserByEmailOrUsername(identifier);

            if (appUser == null) {
                throw new UsernameNotFoundException("User not found with the provided identifier");
            }

            // authenticate user using the located AppUser
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(appUser.getUsername(), tokenRequest.getPassword()));

            // extract UserDetails from the authentication object
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // generate JWT token using UserDetails
            String generatedToken = jwtUtil.createToken((AppUser) userDetails, tokenRequest.isRememberMe());

            return new JwtTokenResponse(generatedToken);
        } catch (UsernameNotFoundException e) {
            return new JwtTokenResponse();
        } catch (Exception e) {
            System.out.println("Error: " + e);
            return new JwtTokenResponse();
        }
    }
}
