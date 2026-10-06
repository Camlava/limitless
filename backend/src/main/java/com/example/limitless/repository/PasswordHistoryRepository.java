package com.example.limitless.repository;

import com.example.limitless.entity.PasswordHistory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordHistoryRepository extends JpaRepository<PasswordHistory, Integer> {
    List<PasswordHistory> findByUserId(Integer userId);
}