package com.cart.ecom_proj.controller;



import com.cart.ecom_proj.dto.JwtResponse;
import com.cart.ecom_proj.model.Customer;
import com.cart.ecom_proj.model.LoginRequest;
import com.cart.ecom_proj.security.JwtUtil;
import com.cart.ecom_proj.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    @Autowired
    private JwtUtil jwtUtil;


    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Integer id) {
        return customerService.getCustomerById(id);
    }

    @PostMapping
    public Customer addCustomer(@RequestBody Customer customer) {
        return customerService.addCustomer(customer);
    }

    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Integer id, @RequestBody Customer customer) {
        return customerService.updateCustomer(id, customer);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Integer id) {
        customerService.deleteCustomer(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Customer loginRequest) {
        System.out.println("Nom d'utilisateur reçu : " + loginRequest.getNom());  // Log pour vérifier le nom d'utilisateur
        System.out.println("Mot de passe reçu : " + loginRequest.getPassword());  // Log pour vérifier le mot de passe

        Customer customer = customerService.findByName(loginRequest.getNom());

        if (customer == null) {
            System.out.println("Utilisateur non trouvé");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Nom d'utilisateur ou mot de passe incorrect");
        }

        // Vérifie si les mots de passe correspondent
        System.out.println("Mot de passe stocké : " + customer.getPassword());
        if (!customer.getPassword().equals(loginRequest.getPassword())) {
            System.out.println("Mot de passe incorrect");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Nom d'utilisateur ou mot de passe incorrect");
        }

        String token = jwtUtil.generateToken(customer.getNom()); // Utilisation du nom pour générer le token
        return ResponseEntity.ok(new JwtResponse(token));
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Customer customer) {
        try {
            Customer savedCustomer = customerService.addCustomer(customer);
            return ResponseEntity.ok(savedCustomer);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'inscription");
        }
    }


}
