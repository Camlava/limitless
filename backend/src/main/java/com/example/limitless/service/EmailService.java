package com.example.limitless.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Email stub: logs the message instead of sending it. Every email feature
 * (access requests, approvals, admin-sent mail, expiry warnings) goes through
 * send(), so swapping in real SMTP later only changes this one method.
 */
@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    public void send(String to, String subject, String body) {
        log.info("\n=== EMAIL ===\nTo: {}\nSubject: {}\n\n{}\n=============", to, subject, body);
    }
}