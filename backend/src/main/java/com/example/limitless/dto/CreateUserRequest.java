package com.example.limitless.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;

public record CreateUserRequest(
        @JsonProperty("first_name") String firstName,
        @JsonProperty("last_name") String lastName,
        @JsonProperty("email_address") String emailAddress,
        @JsonProperty("home_address") String homeAddress,
        @JsonProperty("birth_date") LocalDate birthDate,
        String role,
        @JsonProperty("security_question1") String securityQuestion1,
        @JsonProperty("security_question2") String securityQuestion2,
        @JsonProperty("security_question3") String securityQuestion3,
        @JsonProperty("security_answer1") String securityAnswer1,
        @JsonProperty("security_answer2") String securityAnswer2,
        @JsonProperty("security_answer3") String securityAnswer3) {
}