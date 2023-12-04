package com.example.backend.controllers;

import com.example.backend.auth.EmailOrUsernameAuthenticationProvider;
import com.example.backend.models.JwtTokenRequest;
import com.example.backend.models.JwtTokenResponse;
import com.example.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Autowired
    private EmailOrUsernameAuthenticationProvider emailOrUsernameAuthenticationProvider;

    @ResponseBody
    @RequestMapping(value = "/api/login", method = RequestMethod.POST)
    public ResponseEntity login(@RequestBody JwtTokenRequest loginReq) {
        try {
            Authentication authentication = emailOrUsernameAuthenticationProvider.authenticate(
                    new UsernamePasswordAuthenticationToken(loginReq.getIdentifier(), loginReq.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            JwtTokenResponse loginRes = authService.authenticate(loginReq);
            return ResponseEntity.ok(loginRes);
        } catch (Exception e) {
            System.out.println("error: " + e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
