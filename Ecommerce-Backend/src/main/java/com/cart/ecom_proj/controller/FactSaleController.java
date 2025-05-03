package com.cart.ecom_proj.controller;

import com.cart.ecom_proj.model.FactSale;
import com.cart.ecom_proj.service.FactSaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
public class FactSaleController {

    private final FactSaleService factSaleService;

    @PostMapping("/add")
    public FactSale addSale(@RequestParam Long productId,
                            @RequestParam Long customerId,
                            @RequestParam Integer dateId,
                            @RequestParam Integer quantity,
                            @RequestParam Double unitPrice) {

        return factSaleService.addFactSale(productId, customerId, dateId, quantity, unitPrice);
    }
}
