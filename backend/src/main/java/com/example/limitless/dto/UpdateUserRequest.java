package com.example.limitless.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;

// Any field left null is not changed.
public record UpdateUserRequest(
        @JsonProperty("first_name") String firstName,
        @JsonProperty("last_name") String lastName,
        @JsonProperty("email_address") String emailAddress,
        @JsonProperty("home_address") String homeAddress,
        @JsonProperty("birth_date") LocalDate birthDate,
        String picture,
        String role) {
}