package com.example.Lakshmi.Ayurvedic_db.service;


import java.util.List;

import com.example.Lakshmi.Ayurvedic_db.module.Admin;
import com.example.Lakshmi.Ayurvedic_db.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Add Admin
    public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    // Get All Admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Get Admin By ID
    public Admin getAdminById(Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found with id: " + id));
    }

    // Update Admin
    public Admin updateAdmin(Long id, Admin adminDetails) {
        Admin admin = getAdminById(id);

        admin.setUsername(adminDetails.getUsername());
        admin.setEmail(adminDetails.getEmail());
        admin.setPassword(adminDetails.getPassword());
        admin.setRole(adminDetails.getRole());
        admin.setStatus(adminDetails.getStatus());

        return adminRepository.save(admin);
    }

    // Delete Admin
    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    public Admin login(String username, String password) {
        return adminRepository
                .findByUsernameAndPassword(username, password)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
}

