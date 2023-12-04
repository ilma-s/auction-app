package com.example.backend.controllers;

import com.example.backend.models.AppUser;
import com.example.backend.services.UserService;
import com.example.backend.auth.JwtUtil;
import com.example.backend.models.JwtTokenRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/register")
public class RegistrationController {

    @Value("${frontend_address}")
    private String frontend_address;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody AppUser user) {
        try {
            user.setIsAdmin(false);
            user.setIsEnabled(true);
            userService.registerUser(user);

            JwtTokenRequest tokenRequest = new JwtTokenRequest();
            tokenRequest.setIdentifier(user.getUsername());
            tokenRequest.setPassword(user.getPassword());

            String generatedToken = jwtUtil.createToken(user, true);;

            return ResponseEntity.ok(generatedToken);

        } catch (RuntimeException e) {
            // handle specific exceptions (e.g., username or email already exists)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (Exception e) {
            // handle other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during registration");
        }
    }
}
