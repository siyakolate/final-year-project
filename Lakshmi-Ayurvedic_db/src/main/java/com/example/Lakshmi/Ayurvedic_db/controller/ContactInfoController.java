package com.example.Lakshmi.Ayurvedic_db.controller;

import com.example.Lakshmi.Ayurvedic_db.module.ContactInfo;
import com.example.Lakshmi.Ayurvedic_db.service.ContactInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin("*")
public class ContactInfoController {

    @Autowired
    private ContactInfoService contactInfoService;

    // Add or Update Contact Info (Admin)
    @PostMapping
    public ContactInfo saveContactInfo(@RequestBody ContactInfo contactInfo) {
        return contactInfoService.saveOrUpdate(contactInfo);
    }

    // View Contact Info (User)
    @GetMapping
    public ContactInfo getContactInfo() {
        return contactInfoService.getContactInfo();
    }
    // Update Contact Info (Admin)
    @PutMapping("/{id}")
    public ContactInfo updateContactInfo(
            @PathVariable Long id,
            @RequestBody ContactInfo contactInfo) {

        return contactInfoService.updateContactInfo(id, contactInfo);
    }


    // Delete Contact Info (Admin)
    @DeleteMapping("/{id}")
    public String deleteContactInfo(@PathVariable Long id) {
        contactInfoService.deleteContactInfo(id);
        return "Contact information deleted successfully";
    }
}
