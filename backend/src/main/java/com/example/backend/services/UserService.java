package com.example.backend.services;

import com.example.backend.models.AppUser;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static com.example.backend.utils.RegistrationUtil.isValidEmail;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private static UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findUserByUsername(username);

        if (appUser == null) {
            throw new UsernameNotFoundException("User with username: " + username + " not found");
        }

        // Create and return the Spring Security AppUser object
        return appUser;
    }


    public void registerUser(AppUser user) {
        // Check if a user with the same username already exists
        AppUser existingUserByUsername = userRepository.findUserByUsername(user.getUsername());
        if (existingUserByUsername != null) {
            throw new RuntimeException("User with this username already exists.");
        }

        // Check if a user with the same email already exists
        AppUser existingUserByEmail = userRepository.findUserByEmail(user.getEmail());
        if (existingUserByEmail != null) {
            throw new RuntimeException("User with this email already exists.");
        }

        // Encode the user's password before saving to the database
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        //set role?

        user.setUserId(null);

        // Save the user to the database
        try {
            userRepository.save(user);
        } catch (DataAccessException e) {
            System.out.println("error: " + e);
        }
    }

    public static AppUser findUserByEmailOrUsername(String identifier) {
        AppUser appUser;
        if (isValidEmail(identifier)) {
            appUser = userRepository.findUserByEmail(identifier);
        } else {
            appUser = userRepository.findUserByUsername(identifier);
        }

        return appUser;
    }
}
