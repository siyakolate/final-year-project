package com.example.Lakshmi.Ayurvedic_db.repository;

import com.example.Lakshmi.Ayurvedic_db.module.Product;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository extends JpaRepository<Product, Long> {
}

