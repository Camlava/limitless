package com.example.limitless.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "journal_entries")
public class JournalEntries {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "reviewed_by", nullable = false)
    private User reviewedBy;

    @Column(name = "entry_date")
    private LocalDate entryDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "entry_type")
    private JournalEntryType entryType;

    @Enumerated(EnumType.STRING)
    private JournalStatus status;

    @Column(length = 255)
    private String comment;

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public enum JournalEntryType {REGULAR, ADJUSTING}

    public enum JournalStatus {PENDING, APPROVED, REJECTED}
}
