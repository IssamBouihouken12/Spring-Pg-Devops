package com.cart.ecom_proj.controller;

import com.cart.ecom_proj.model.DimDate;
import com.cart.ecom_proj.model.FactSale;
import com.cart.ecom_proj.model.Customer;
import com.cart.ecom_proj.repo.CustomerRepo;
import com.cart.ecom_proj.repo.DimDateRepo;
import com.cart.ecom_proj.security.JwtUtil;
import com.cart.ecom_proj.service.CustomerService;
import com.cart.ecom_proj.service.FactSaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
public class FactSaleController {
private final JwtUtil jwtUtil;
    private final FactSaleService factSaleService;
    private final DimDateRepo dimDateRepo;
    private final CustomerService customerService;

    @PostMapping("/add")
    public FactSale addSale(@RequestParam Long productId,
                            @RequestParam Long customerId,
                            @RequestParam Integer dateId,
                            @RequestParam Integer quantity,
                            @RequestParam Double unitPrice) {

        return factSaleService.addFactSale(productId, customerId, dateId, quantity, unitPrice);
    }

    @PostMapping("/confirm-purchase")
    public ResponseEntity<?> confirmPurchase(@RequestBody List<Map<String, Object>> cartItems,
                                           @RequestHeader("Authorization") String token) {
        try {
            System.out.println("Début de la confirmation d'achat");
            System.out.println("Token reçu: " + token);
            
            String username = jwtUtil.extractUsername(token.substring(7));
            System.out.println("Username extrait: " + username);
            
            Customer customer = customerService.findByName(username);
            System.out.println("Client trouvé: " + (customer != null));
            
            if (customer == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Client non trouvé");
            }

            for (Map<String, Object> item : cartItems) {
                System.out.println("Traitement de l'item: " + item);
                
                Long productId = Long.valueOf(item.get("id").toString());
                Integer quantity = Integer.valueOf(item.get("quantity").toString());
                Double unitPrice = Double.valueOf(item.get("price").toString());

                System.out.println("Données extraites - ProductId: " + productId + 
                                ", Quantity: " + quantity + 
                                ", UnitPrice: " + unitPrice);

                // Créer une nouvelle date pour la vente
                DimDate date = new DimDate();
                LocalDate today = LocalDate.now();
                
                // Générer un ID unique basé sur la date (format: YYYYMMDD)
                int dateId = today.getYear() * 10000 + 
                           today.getMonthValue() * 100 + 
                           today.getDayOfMonth();
                date.setDateId(dateId);
                
                date.setDateComplete(today.toString());
                date.setAnnee(today.getYear());
                date.setMois(today.getMonthValue());
                date.setNomMois(today.getMonth().toString());
                date.setTrimestre((today.getMonthValue() - 1) / 3 + 1);
                date.setJourSemaine(today.getDayOfWeek().toString());
                date.setWeekend(today.getDayOfWeek().getValue() >= 6);
                
                date = dimDateRepo.save(date);
                System.out.println("Date créée avec l'ID: " + date.getDateId());

                // Enregistrer la vente
                FactSale sale = factSaleService.addFactSale(
                    productId,
                    customer.getCustomerId(),
                    date.getDateId(),
                    quantity,
                    unitPrice
                );
                System.out.println("Vente enregistrée avec l'ID: " + sale.getSaleId());
            }

            return ResponseEntity.ok("Achat confirmé avec succès");
        } catch (Exception e) {
            System.err.println("Erreur lors de la confirmation de l'achat: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la confirmation de l'achat: " + e.getMessage());
        }
    }
}
