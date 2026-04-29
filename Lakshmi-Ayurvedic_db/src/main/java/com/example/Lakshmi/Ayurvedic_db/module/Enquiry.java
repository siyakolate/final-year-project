package com.example.Lakshmi.Ayurvedic_db.module;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "enquiry")
public class Enquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long enquiryId;

    private String name;
    private String email;
    private String phone;

    @Column(length = 500)
    private String message;

    private String status;
    private LocalDateTime createdAt;

    // 🔥 Many Enquiries → One Product
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public Enquiry() {
        this.createdAt = LocalDateTime.now();
        this.status = "PENDING";
    }

    // Getters & Setters

    public Long getEnquiryId() {
        return enquiryId;
    }

    public void setEnquiryId(Long enquiryId) {
        this.enquiryId = enquiryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}