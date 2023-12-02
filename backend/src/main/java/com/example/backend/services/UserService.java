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

import java.util.logging.Logger;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findUserByUsername(username);
        Logger.getLogger("TestLog").info("Pozvana funkcija: " + username);

        if (appUser == null) {
            throw new UsernameNotFoundException("User with username: " + username + " not found");
        }

        // Log retrieved user details for debugging
        Logger.getLogger("TestLog").info("Retrieved user: " + appUser.getUsername() + ", Password: " + appUser.getPassword());

        // Create and return the Spring Security AppUser object
        return org.springframework.security.core.userdetails.User.builder()
                .username(appUser.getUsername())
                .password(appUser.getPassword())
                //.roles("USER")
                .build();
    }


    public void registerUser(AppUser user) {
        System.out.println("here: " + user.toString());
        // Perform validation logic (e.g., check if username is unique)
        System.out.println("user.getPassword: " + user.getPassword());

        // Encode the user's password before saving to the database
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        System.out.println("pass: " + user.getPassword());
        //set role?

        user.setUserId(null);

        // Save the user to the database
        try {
            userRepository.save(user);
        } catch (DataAccessException e) {
            System.out.println("errorrr: " + e);
        }

        System.out.println("ohohhhh");
    }
}
