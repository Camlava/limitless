package com.example.limitless.controller;

import com.example.limitless.dto.ForgotPasswordRequest;
import com.example.limitless.dto.ResetPasswordRequest;
import com.example.limitless.service.PasswordService;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class PasswordController {

    private final PasswordService passwordService;

    public PasswordController(PasswordService passwordService) {
        this.passwordService = passwordService;
    }

    @PostMapping("/forgot-password")
    public Map<String, String> forgotPassword(@RequestBody ForgotPasswordRequest req) {
        return Map.of("reset_token", passwordService.forgotPassword(req));
    }

    @PostMapping("/reset-password")
    public Map<String, String> resetPassword(@RequestBody ResetPasswordRequest req) {
        passwordService.resetPassword(req);
        return Map.of("message", "Password successfully reset.");
    }
}