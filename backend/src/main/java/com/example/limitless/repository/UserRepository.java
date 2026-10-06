package com.example.limitless.repository;

import com.example.limitless.entity.User;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmailAddress(String emailAddress);

    List<User> findByPasswordExpiryBefore(LocalDate date);

    List<User> findByPasswordExpiry(LocalDate date);

    List<User> findByRole(User.UserRole role);
}