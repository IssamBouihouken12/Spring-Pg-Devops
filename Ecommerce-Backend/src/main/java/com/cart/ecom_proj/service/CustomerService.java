package com.cart.ecom_proj.service;



import com.cart.ecom_proj.model.Customer;
import com.cart.ecom_proj.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    // Récupérer tous les clients
    public List<Customer> getAllCustomers() {
        return customerRepo.findAll();
    }

    // Récupérer un client par ID
    public Customer getCustomerById(Integer id) {
        return customerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Client non trouvé"));
    }

    // Ajouter un nouveau client
    public Customer addCustomer(Customer customer) {
        return customerRepo.save(customer);
    }

    // Mettre à jour un client
    public Customer updateCustomer(Integer id, Customer customerDetails) {
        Customer customer = getCustomerById(id);
        customer.setNom(customerDetails.getNom());
        customer.setPassword(customerDetails.getPassword());
        customer.setRegion(customerDetails.getRegion());

        return customerRepo.save(customer);
    }

    // Supprimer un client
    public void deleteCustomer(Integer id) {
        Customer customer = getCustomerById(id);
        customerRepo.delete(customer);
    }
    public Customer findByName(String nom) {
        return customerRepo.findByNom(nom);
    }
}
