package com.example.limitless.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

// Returned once on creation so the admin can hand over the temporary password.
public record CreateUserResponse(
        UserResponse user,
        @JsonProperty("temporary_password") String temporaryPassword) {
}