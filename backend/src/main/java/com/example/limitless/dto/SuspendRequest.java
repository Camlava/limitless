package com.example.limitless.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;

public record SuspendRequest(
        @JsonProperty("suspension_start") LocalDate suspensionStart,
        @JsonProperty("suspension_end") LocalDate suspensionEnd) {
}