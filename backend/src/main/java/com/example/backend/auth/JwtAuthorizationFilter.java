package com.example.backend.auth;

import com.example.backend.services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    public JwtAuthorizationFilter(JwtUtil jwtUtil, UserService userService, AuthenticationManager authenticationManager) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = null;

        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("accessToken")) {
                    token = cookie.getValue();
                }
            }
        }

        if (token != null && !token.isEmpty()) {
            // Token exists, try to authenticate
            String email = jwtUtil.extractEmail(token);

            if (email != null) {
                UserDetails userDetails = userService.loadUserByUsername(email);
                if (jwtUtil.validateToken(token, userDetails)) {

                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                } else {
                    System.out.println("Token validation failed!");
                }
            }
        } else {
            // No token, handle user login without a token
            // Assuming you have a method in your service to load user details by username
            UserDetails userDetails = userService.loadUserByUsername("username");

            // Assuming you have a method in your service to authenticate the user
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, "password", userDetails.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // Authenticate the user
            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            // Set the authentication in the security context
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }
}
