package com.example.backend.auth;

import com.example.backend.models.AppUser;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private ApplicationContext applicationContext;

    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
        // had to be implemented because of AbstractUserDetailsAuthenticationProvider
    }

    @Override
    protected UserDetails retrieveUser(String identifier, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
        AppUser appUser = null;
        try {
            appUser = userService.findUserByEmailOrUsername(identifier);
        } catch (Exception e) {
            logger.error("User with identifier " + identifier + " not found.");
            throw new UsernameNotFoundException("User with identifier " + identifier + " not found.");
        }

        if (appUser == null) {
            throw new UsernameNotFoundException("User not found with the provided identifier");
        }

        // check the password
        String password = (String) authentication.getCredentials();

        // retrieve PasswordEncoder from the ApplicationContext -> circumvent circular dependencies
        BCryptPasswordEncoder passwordEncoder = applicationContext.getBean(BCryptPasswordEncoder.class);

        if (!passwordEncoder.matches(password, appUser.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        return userDetailsService.loadUserByUsername(appUser.getUsername());
    }

    @Override
    protected Authentication createSuccessAuthentication(Object principal, Authentication authentication, UserDetails user) {
        return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
    }
}
