package com.cart.ecom_proj.repo;

import com.cart.ecom_proj.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<Customer,Integer> {
    Customer findByNom(String nom);
}
