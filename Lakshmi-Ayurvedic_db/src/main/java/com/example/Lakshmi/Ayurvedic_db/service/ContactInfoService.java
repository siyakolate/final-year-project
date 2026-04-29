package com.example.Lakshmi.Ayurvedic_db.service;

import com.example.Lakshmi.Ayurvedic_db.module.ContactInfo;
import com.example.Lakshmi.Ayurvedic_db.repository.ContactInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactInfoService {

    @Autowired
    private ContactInfoRepository contactInfoRepository;

    // Add / Update Contact Info
    public ContactInfo saveOrUpdate(ContactInfo contactInfo) {
        contactInfo.setUpdatedAt(java.time.LocalDateTime.now());
        return contactInfoRepository.save(contactInfo);
    }

    // Get Contact Info (Single Record)
    public ContactInfo getContactInfo() {
        return contactInfoRepository.findAll()
                .stream()
                .findFirst()
                .orElse(null);
    }
    // Update Contact Info
    public ContactInfo updateContactInfo(Long id, ContactInfo contactDetails) {

        ContactInfo contactInfo = contactInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact info not found with id: " + id));

        contactInfo.setPhone(contactDetails.getPhone());
        contactInfo.setEmail(contactDetails.getEmail());
        contactInfo.setAddress(contactDetails.getAddress());
        contactInfo.setMapLink(contactDetails.getMapLink());
        contactInfo.setUpdatedAt(java.time.LocalDateTime.now());

        return contactInfoRepository.save(contactInfo);
    }

    // Delete Contact Info
    public void deleteContactInfo(Long id) {
        contactInfoRepository.deleteById(id);
    }
}

