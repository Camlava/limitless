package com.example.limitless.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "event_log")
public class EventLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "table_name", length = 50)
    private String tableName;

    @Column(columnDefinition = "TEXT")
    private String before_image;

    @Column(columnDefinition = "TEXT")
    private String after_image;

    @Column(name = "record_id")
    private Integer recordId;

    @Column(name = "changed_at")
    private LocalDateTime changedAt;

    @Enumerated(EnumType.STRING)
    private actionType action;

    public enum actionType {ADD, MODIFY, DEACTIVATE}
}
