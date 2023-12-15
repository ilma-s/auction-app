package com.example.backend.auth;

import com.example.backend.models.AppUser;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class JwtUtil {

    @Getter
    private final byte[] secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded();
    private static final long ACCESS_TOKEN_EXPIRATION = 900; // 15 minutes
    private static final long REFRESH_TOKEN_EXPIRATION = 2592000; // 30 days
    private final JwtParser jwtParser;
    private final String TOKEN_HEADER = "Authorization";
    private final String TOKEN_PREFIX = "Bearer ";

    public JwtUtil() {
        this.jwtParser = Jwts.parser().setSigningKey(secretKey).build();
    }

    public String createToken(AppUser user, boolean isRefreshToken) {
        long expiration = isRefreshToken ? REFRESH_TOKEN_EXPIRATION : ACCESS_TOKEN_EXPIRATION;
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public static Cookie createCookie(String name, String value, boolean httpOnly, boolean secure) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(httpOnly);
        cookie.setSecure(secure);
        cookie.setPath("/");
        return cookie;
    }

    public String createAccessToken(AppUser user) {
        return createToken(user, false);
    }

    public String createRefreshToken(AppUser user) {
        return createToken(user, true);
    }

    public Claims parseJwtClaims(String token) {
        System.out.println("token: " + token.toString());
        return jwtParser.parseClaimsJws(token).getBody();
    }

    public Claims resolveClaims(HttpServletRequest req) {
        try {
            String token = resolveToken(req);
            if (token != null) {
                return parseJwtClaims(token);
            }
            return null;
        } catch (ExpiredJwtException ex) {
            req.setAttribute("expired", ex.getMessage());
            throw ex;
        } catch (Exception ex) {
            req.setAttribute("invalid", ex.getMessage());
            throw ex;
        }
    }

    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(TOKEN_HEADER);
        if (bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX)) {
            return bearerToken.substring(TOKEN_PREFIX.length());
        }
        return null;
    }

    public boolean validateClaims(Claims claims) throws AuthenticationException {
        try {
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            throw e;
        }
    }

    public String extractEmail(String token) {
        return parseJwtClaims(token).getSubject();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        Claims claims = parseJwtClaims(token);
        String email = extractEmail(token);
        return email.equals(userDetails.getUsername()) && validateClaims(claims);
    }

}