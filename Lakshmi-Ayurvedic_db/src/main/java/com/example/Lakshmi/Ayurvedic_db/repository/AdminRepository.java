package com.example.Lakshmi.Ayurvedic_db.repository;



import com.example.Lakshmi.Ayurvedic_db.module.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface AdminRepository extends JpaRepository<Admin, Long> {


    Optional<Admin> findByUsernameAndPassword(String username, String password);

}

