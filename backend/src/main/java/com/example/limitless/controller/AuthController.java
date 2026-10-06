package com.example.limitless.controller;

import com.example.limitless.config.JwtService;
import com.example.limitless.entity.User;
import com.example.limitless.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        User user = authService.login(request.username(), request.password());

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("picture", user.getPicture());
        response.put("role", user.getRole());
        response.put("token", jwtService.generateToken(user.getId(), user.getUsername(), user.getRole().name()));

        return ResponseEntity.ok(response);
    }

    /**
     * Catches AuthService.AuthenticationException specifically and maps it to
     * the status/body shape used throughout the API contract doc. Any other
     * exception type is left to propagate (and will 500, which is correct —
     * it means something unexpected broke, not a login failure).
     */
    @ExceptionHandler(AuthService.AuthenticationException.class)
    public ResponseEntity<Map<String, String>> handleAuthException(AuthService.AuthenticationException ex) {
        Map<String, String> body = new LinkedHashMap<>();
        body.put("error", ex.getStatus().getReasonPhrase());
        body.put("message", ex.getMessage());

        return ResponseEntity.status(ex.getStatus()).body(body);
    }

    public record LoginRequest(String username, String password){
    }
}
