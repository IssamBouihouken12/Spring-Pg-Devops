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
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        Customer customer = customerRepository.findById(Math.toIntExact(customerId))
                .orElseThrow(() -> new RuntimeException("Client non trouvé"));
        DimDate date = dimDateRepository.findById(dateId)
                .orElseThrow(() -> new RuntimeException("Date non trouvée"));

        FactSale sale = new FactSale();
        sale.setProduct(product);
        sale.setCustomer(customer);
        sale.setDate(date);
        sale.setQuantitySold(quantity);
        sale.setUnitPrice(unitPrice);
        sale.setTotalAmount(quantity * unitPrice);

        return factSaleRepository.save(sale);
    }
}
