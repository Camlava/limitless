package com.example.limitless.service;

import com.example.limitless.repository.UserRepository;
import java.time.LocalDate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/** Sprint item 15: warn users 3 days before their password expires. */
@Component
@EnableScheduling
public class PasswordExpiryNotifier {

    private final UserRepository userRepository;
    private final EmailService emailService;

    public PasswordExpiryNotifier(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    // Every day at 8:00 AM
    @Scheduled(cron = "0 0 8 * * *")
    public void notifyExpiringPasswords() {
        notifyUsersExpiringOn(LocalDate.now().plusDays(3));
    }

    public void notifyUsersExpiringOn(LocalDate date) {
        userRepository.findByPasswordExpiry(date).forEach(u ->
                emailService.send(u.getEmailAddress(), "Your password expires soon",
                        "Hi " + u.getFirstName() + ", your password expires on " + date
                                + ". Please change it before then."));
    }
}