package com.cart.ecom_proj.dto;

import lombok.Data;
import java.util.List;

@Data
public class CartDTO {
    private Long cartId;
    private Long customerId;
    private List<CartItemDTO> cartItems;
    private Double totalAmount;
} 