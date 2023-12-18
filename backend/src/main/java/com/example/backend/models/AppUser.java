package com.example.backend.models;

import lombok.Data;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Entity
@Data
public class AppUser implements UserDetails {
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Id
    private String userId;

    @NotEmpty
    private String username;

    @Email
    private String email;

    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    private String firstName;
    private String lastName;

    private Boolean isAdmin;

    private Boolean isEnabled;

    public AppUser(String username, String password) {
        this.username = username;
        this.password = password;
        this.isEnabled = true; // Set it to true or false based on your logic
    }

    public AppUser() {
        this.username = "";
        this.password = "";
        this.isEnabled = true; // Set it to true or false based on your logic
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Return the authorities/roles for the user
        // For example, return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Set it to true unless you have specific logic for account expiration
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Set it to true unless you have specific logic for account locking
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Set it to true unless you have specific logic for credentials expiration
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
