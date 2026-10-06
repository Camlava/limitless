package com.example.limitless.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ForgotPasswordRequest(
        String username,
        @JsonProperty("email_address") String emailAddress,
        @JsonProperty("security_answer1") String securityAnswer1,
        @JsonProperty("security_answer2") String securityAnswer2,
        @JsonProperty("security_answer3") String securityAnswer3) {
}