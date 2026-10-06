package com.example.limitless.controller;

import com.example.limitless.exception.UserException;
import com.example.limitless.service.EmailService;
import com.example.limitless.service.UserService;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/** Sprint item 19: admin sends an email to a user from within the system. */
@RestController
@RequestMapping("/api/users")
public class UserEmailController {

    private final UserService userService;
    private final EmailService emailService;

    public UserEmailController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }

    public record EmailRequest(String subject, String body) {}

    @PostMapping("/{id}/send-email")
    public Map<String, String> sendEmail(@PathVariable Integer id, @RequestBody EmailRequest req) {
        if (req.subject() == null || req.subject().isBlank()
                || req.body() == null || req.body().isBlank()) {
            throw new UserException(HttpStatus.BAD_REQUEST, "Subject and body are required.");
        }
        var user = userService.getUserById(id);
        emailService.send(user.getEmailAddress(), req.subject(), req.body());
        return Map.of("message", "Email sent successfully.");
    }
}