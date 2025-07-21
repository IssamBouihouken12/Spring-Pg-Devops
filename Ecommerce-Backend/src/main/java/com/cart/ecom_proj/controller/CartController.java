package com.cart.ecom_proj.controller;

import com.cart.ecom_proj.dto.CartDTO;
import com.cart.ecom_proj.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")

public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<CartDTO> getCart(@RequestParam Long customerId) {
        return ResponseEntity.ok(cartService.getOrCreateCart(customerId));
    }

    @PostMapping("/items")
    public ResponseEntity<CartDTO> addItemToCart(
            @RequestParam Long customerId,
            @RequestParam Long productId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.addItemToCart(customerId, productId, quantity));
    }

    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<CartDTO> updateCartItemQuantity(
            @RequestParam Long customerId,
            @PathVariable Long cartItemId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.updateCartItemQuantity(customerId, cartItemId, quantity));
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<CartDTO> removeCartItem(
            @RequestParam Long customerId,
            @PathVariable Long cartItemId) {
        return ResponseEntity.ok(cartService.removeCartItem(customerId, cartItemId));
    }
} 