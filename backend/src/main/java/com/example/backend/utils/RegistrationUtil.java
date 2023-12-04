package com.example.backend.utils;

import com.example.backend.models.AppUser;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RegistrationUtil {

    private static UserRepository userRepository = null;

    @Autowired
    public RegistrationUtil(UserRepository userRepository) {
        RegistrationUtil.userRepository = userRepository;
    }

    public static boolean isValidEmail(String email) {
        return email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
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
