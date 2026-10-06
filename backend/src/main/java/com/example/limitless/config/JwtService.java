package com.example.limitless.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private final SecretKey key;
    private final long expirationMs;

    public JwtService(@Value("${jwt.secret}") String secret,
                      @Value("${jwt.expiration-minutes:60}") long expirationMinutes) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMinutes * 60_000;
    }

    public String generateToken(Integer userId, String username, String role) {
        Date now = new Date();
        return Jwts.builder()
                .subject(username)
                .claim("uid", userId)
                .claim("role", role)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expirationMs))
                .signWith(key)
                .compact();
    }

    /** Short-lived token used only by POST /api/auth/reset-password. */
    public String generateResetToken(Integer userId, int fingerprint) {
        Date now = new Date();
        return Jwts.builder()
                .subject("reset")
                .claim("uid", userId)
                .claim("purpose", "reset")
                .claim("fp", fingerprint)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + 15 * 60_000))
                .signWith(key)
                .compact();
    }

    /** Returns the claims if the token is valid and unexpired, otherwise null. */
    public Claims parse(String token) {
        try {
            return Jwts.parser().verifyWith(key).build()
                    .parseSignedClaims(token).getPayload();
        } catch (JwtException | IllegalArgumentException e) {
            return null;
        }
    }
}