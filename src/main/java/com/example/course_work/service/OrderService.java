package com.example.course_work.service;

import com.example.course_work.model.Order;
import com.example.course_work.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class OrderService {
    private static OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public static void delete(Order order) {
        log.info("Delete order by id = {}", order);
        orderRepository.delete(order);
    }

    @Transactional
    public String create(Order order) {
        log.info("Create orders {}", order);
        orderRepository.save(order);
        return "add_orders";
    }

    @Transactional
    public List<Order> readAll() {
        log.info("Read all orders");
        return orderRepository.findAll();
    }

    @Transactional
    public Order read(long id) {
        log.info("Read by id = {}", id);
        return orderRepository.getById(id);
    }

    @Transactional
    public boolean delete(long id) {
        log.info("Delete order by id = {}", id);
        orderRepository.deleteById(id);
        return true;
    }
}
