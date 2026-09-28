package com.example.limitless.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "journal_entry_lines")
public class JournalEntryLines {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "journal_entry_id", nullable = false)
    private JournalEntries journalEntryID;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account accountID;

    @Enumerated(EnumType.STRING)
    private Side entry_side;

    @Column(precision = 15, scale = 2)
    private BigDecimal amount;

    public enum Side{LEFT, RIGHT}
}
