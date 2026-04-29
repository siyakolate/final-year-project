package com.example.Lakshmi.Ayurvedic_db.controller;

import java.util.List;
import com.example.Lakshmi.Ayurvedic_db.module.Enquiry;
import com.example.Lakshmi.Ayurvedic_db.service.EnquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enquiries")
@CrossOrigin("*")
public class EnquiryController {

    @Autowired
    private EnquiryService enquiryService;

    // 🔥 POST with productId in URL
    @PostMapping("/product/{productId}")
    public Enquiry addEnquiry(
            @PathVariable Long productId,
            @RequestBody Enquiry enquiry) {

        return enquiryService.addEnquiry(productId, enquiry);
    }

    @GetMapping
    public List<Enquiry> getAllEnquiries() {
        return enquiryService.getAllEnquiries();
    }

    @DeleteMapping("/{id}")
    public String deleteEnquiry(@PathVariable Long id) {
        enquiryService.deleteEnquiry(id);
        return "Enquiry deleted successfully";
    }
}