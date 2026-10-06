package com.example.limitless.repository;

import com.example.limitless.entity.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JournalEntryRepository extends JpaRepository<JournalEntry, Integer> {
}
