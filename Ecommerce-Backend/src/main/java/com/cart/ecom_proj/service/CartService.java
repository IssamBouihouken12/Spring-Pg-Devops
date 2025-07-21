package com.cart.ecom_proj.service;

import com.cart.ecom_proj.model.Customer;
import com.cart.ecom_proj.model.Product;
import com.cart.ecom_proj.repo.CustomerRepo;
import com.cart.ecom_proj.repo.ProductRepo;
import com.cart.ecom_proj.dto.CartDTO;
import com.cart.ecom_proj.dto.CartItemDTO;
import com.cart.ecom_proj.model.Cart;
import com.cart.ecom_proj.model.CartItem;
import com.cart.ecom_proj.repo.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CustomerRepo customerRepository;

    @Autowired
    private ProductRepo productRepository;

    @Transactional
    public CartDTO getOrCreateCart(Long customerId) {
        Cart cart = cartRepository.findByCustomerCustomerId(customerId)
                .orElseGet(() -> createNewCart(customerId.intValue()));
        return convertToDTO(cart);
    }

    @Transactional
    public CartDTO addItemToCart(Long customerId, Long productId, Integer quantity) {
        Cart cart = cartRepository.findByCustomerCustomerId(customerId)
                .orElseGet(() -> createNewCart(customerId.intValue()));
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem existingItem = cart.getCartItems().stream()
                .filter(item -> Long.valueOf(item.getProduct().getId()).equals(productId))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(quantity);
            newItem.setPrice(product.getPrice().doubleValue());
            cart.getCartItems().add(newItem);
        }

        cart = cartRepository.save(cart);
        return convertToDTO(cart);
    }

    @Transactional
    public CartDTO updateCartItemQuantity(Long customerId, Long cartItemId, Integer quantity) {
        Cart cart = cartRepository.findByCustomerCustomerId(customerId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        CartItem cartItem = cart.getCartItems().stream()
                .filter(item -> item.getCartItemId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (quantity <= 0) {
            cart.getCartItems().remove(cartItem);
        } else {
            cartItem.setQuantity(quantity);
        }

        cart = cartRepository.save(cart);
        return convertToDTO(cart);
    }

    @Transactional
    public CartDTO removeCartItem(Long customerId, Long cartItemId) {
        Cart cart = cartRepository.findByCustomerCustomerId(customerId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getCartItems().removeIf(item -> item.getCartItemId().equals(cartItemId));
        cart = cartRepository.save(cart);
        return convertToDTO(cart);
    }

    private Cart createNewCart(Integer customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        Cart cart = new Cart();
        cart.setCustomer(customer);
        return cartRepository.save(cart);
    }

    private CartDTO convertToDTO(Cart cart) {
        CartDTO dto = new CartDTO();
        dto.setCartId(cart.getCartId());
        dto.setCustomerId(cart.getCustomer().getCustomerId());
        
        List<CartItemDTO> cartItemDTOs = cart.getCartItems().stream()
                .map(this::convertToCartItemDTO)
                .collect(Collectors.toList());
        
        dto.setCartItems(cartItemDTOs);
        dto.setTotalAmount(calculateTotalAmount(cartItemDTOs));
        
        return dto;
    }

    private CartItemDTO convertToCartItemDTO(CartItem cartItem) {
        CartItemDTO dto = new CartItemDTO();
        dto.setCartItemId(cartItem.getCartItemId());
        dto.setProductId(Long.valueOf(cartItem.getProduct().getId()));
        dto.setProductName(cartItem.getProduct().getName());
        dto.setQuantity(cartItem.getQuantity());
        dto.setPrice(cartItem.getPrice());
        dto.setSubtotal(cartItem.getPrice() * cartItem.getQuantity());
        return dto;
    }

    private Double calculateTotalAmount(List<CartItemDTO> cartItems) {
        return cartItems.stream()
                .mapToDouble(CartItemDTO::getSubtotal)
                .sum();
    }
} 