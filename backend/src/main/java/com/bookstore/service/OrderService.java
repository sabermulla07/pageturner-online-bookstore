package com.bookstore.service;

import com.bookstore.dto.ApiResponse;
import com.bookstore.dto.CartItemDto;
import com.bookstore.dto.OrderRequest;
import com.bookstore.entity.Order;
import com.bookstore.entity.OrderItem;
import com.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public ApiResponse<Order> placeOrder(OrderRequest request) {
        if (request.getItems() == null || request.getItems().isEmpty()) {
            return ApiResponse.error("Order items cannot be empty");
        }

        Order order = new Order();
        order.setOrderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setUserEmail(request.getUserEmail());
        order.setCustomerName(request.getCustomerName());
        order.setShippingAddress(request.getShippingAddress());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("CONFIRMED");

        double total = 0.0;
        List<OrderItem> items = new ArrayList<>();
        for (CartItemDto itemDto : request.getItems()) {
            OrderItem item = new OrderItem(
                    itemDto.getBookId(),
                    itemDto.getBookTitle(),
                    itemDto.getPrice(),
                    itemDto.getQuantity()
            );
            items.add(item);
            total += itemDto.getPrice() * itemDto.getQuantity();
        }

        order.setItems(items);
        order.setTotalAmount(Math.round(total * 100.0) / 100.0);

        Order saved = orderRepository.save(order);
        return ApiResponse.ok("Order placed successfully! Order ID: " + saved.getOrderNumber(), saved);
    }

    public List<Order> getOrdersByUser(String email) {
        return orderRepository.findByUserEmailOrderByOrderDateDesc(email.trim().toLowerCase());
    }
}
