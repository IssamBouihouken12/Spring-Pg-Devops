package com.cart.ecom_proj.service;

import com.cart.ecom_proj.model.Customer;
import com.cart.ecom_proj.model.DimDate;
import com.cart.ecom_proj.model.FactSale;
import com.cart.ecom_proj.model.Product;
import com.cart.ecom_proj.repo.CustomerRepo;
import com.cart.ecom_proj.repo.DimDateRepo;
import com.cart.ecom_proj.repo.FactSaleRepo;
import com.cart.ecom_proj.repo.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FactSaleService {

    private final FactSaleRepo factSaleRepository;
    private final ProductRepo productRepository;
    private final CustomerRepo customerRepository;
    private final DimDateRepo dimDateRepository;

    public FactSale addFactSale(Long productId, Long customerId, Integer dateId, Integer quantity, Double unitPrice) {
        try {
            System.out.println("Recherche du produit avec l'ID: " + productId);
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Produit non trouvé avec l'ID: " + productId));

            System.out.println("Recherche du client avec l'ID: " + customerId);
            Customer customer = customerRepository.findById(Math.toIntExact(customerId))
                    .orElseThrow(() -> new RuntimeException("Client non trouvé avec l'ID: " + customerId));

            System.out.println("Recherche de la date avec l'ID: " + dateId);
            DimDate date = dimDateRepository.findById(dateId)
                    .orElseThrow(() -> new RuntimeException("Date non trouvée avec l'ID: " + dateId));

            System.out.println("Création de la vente");
            FactSale sale = new FactSale();
            sale.setProduct(product);
            sale.setCustomer(customer);
            sale.setDate(date);
            sale.setQuantitySold(quantity);
            sale.setUnitPrice(unitPrice);
            sale.setTotalAmount(quantity * unitPrice);

            System.out.println("Sauvegarde de la vente");
            return factSaleRepository.save(sale);
        } catch (Exception e) {
            System.err.println("Erreur lors de l'ajout de la vente: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}
