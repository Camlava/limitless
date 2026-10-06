package com.example.limitless.config;

import com.example.limitless.entity.User;
import com.example.limitless.repository.UserRepository;
import com.example.limitless.service.PasswordService;
import java.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Creates the first administrator on a fresh database. Nobody else can create
 * users or approve access requests until an administrator exists.
 * Runs only when ADMIN_PASSWORD is set and there is no administrator yet.
 */
@Component
public class AdminBootstrap implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminBootstrap.class);
    private static final int PASSWORD_LIFETIME_DAYS = 90;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final String username;
    private final String email;
    private final String password;

    public AdminBootstrap(UserRepository userRepository, PasswordEncoder passwordEncoder,
                          @Value("${app.admin.username}") String username,
                          @Value("${app.admin.email}") String email,
                          @Value("${app.admin.password}") String password) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (password == null || password.isBlank()) return;
        if (!userRepository.findByRole(User.UserRole.ADMINISTRATOR).isEmpty()) return;

        if (!PasswordService.meetsRules(password)) {
            log.warn("ADMIN_PASSWORD does not meet the password rules (8+ characters, starts with a letter, "
                    + "includes a number and a special character); no administrator was created.");
            return;
        }
        if (userRepository.findByUsername(username).isPresent()
                || userRepository.findByEmailAddress(email).isPresent()) {
            log.warn("Cannot create administrator: username '{}' or email '{}' is already in use.", username, email);
            return;
        }

        LocalDate today = LocalDate.now();
        User admin = new User();
        admin.setUsername(username);
        admin.setEmailAddress(email);
        admin.setFirstName("System");
        admin.setLastName("Administrator");
        admin.setRole(User.UserRole.ADMINISTRATOR);
        admin.setStatus(User.UserStatus.ACTIVATED);
        admin.setCreatedAt(today);
        admin.setPasswordHash(passwordEncoder.encode(password));
        admin.setPasswordChangedAt(today);
        admin.setPasswordExpiry(today.plusDays(PASSWORD_LIFETIME_DAYS));
        admin.setPasswordAttempts(0);
        userRepository.save(admin);
        log.info("Created administrator '{}'.", username);
    }
}
