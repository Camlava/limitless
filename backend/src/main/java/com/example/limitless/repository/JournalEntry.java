package com.example.limitless.repository;

import com.example.limitless.entity.JournalEntries;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JournalEntry extends JpaRepository<JournalEntry, Integer> {
}
