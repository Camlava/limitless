package com.example.limitless.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ResetPasswordRequest(
        @JsonProperty("reset_token") String resetToken,
        @JsonProperty("new_password") String newPassword) {
}