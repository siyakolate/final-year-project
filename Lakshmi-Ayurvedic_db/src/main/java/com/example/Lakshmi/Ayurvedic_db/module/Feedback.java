package com.example.Lakshmi.Ayurvedic_db.module;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    private String name;
    private String email;

    @Column(length = 1000)
    private String message;

    @Column(nullable = false)
    private Integer rating; // ⭐ ADD THIS

    private LocalDateTime createdAt;

    public Feedback() {
        this.createdAt = LocalDateTime.now();
        this.rating = 5; // ⭐ default value (optional but useful)
    }

    // Getters & Setters
    public Long getFeedbackId() { return feedbackId; }
    public void setFeedbackId(Long feedbackId) { this.feedbackId = feedbackId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Integer getRating() { return rating; } // ⭐ ADD
    public void setRating(Integer rating) { this.rating = rating; } // ⭐ ADD

    public LocalDateTime getCreatedAt() { return createdAt; }
}