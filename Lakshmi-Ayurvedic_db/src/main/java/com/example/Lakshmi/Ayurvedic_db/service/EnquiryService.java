package com.example.Lakshmi.Ayurvedic_db.service;

import java.util.List;

import com.example.Lakshmi.Ayurvedic_db.module.Enquiry;
import com.example.Lakshmi.Ayurvedic_db.module.Product;
import com.example.Lakshmi.Ayurvedic_db.repository.EnquiryRepository;
import com.example.Lakshmi.Ayurvedic_db.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnquiryService {

    @Autowired
    private EnquiryRepository enquiryRepository;

    @Autowired
    private ProductRepository productRepository;

    // Add Enquiry with Product relation
    public Enquiry addEnquiry(Long productId, Enquiry enquiry) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        enquiry.setProduct(product);

        return enquiryRepository.save(enquiry);
    }

    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAll();
    }

    public void deleteEnquiry(Long id) {
        enquiryRepository.deleteById(id);
    }
}