package com.example.course_work.dto;

import com.example.course_work.model.Dog;
import com.example.course_work.model.Order;
import com.example.course_work.service.DogService;
import lombok.Builder;
import lombok.Getter;
import com.example.course_work.model.Role;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Builder
public class AddOrderDTO{

    private int user_id;

    private int dog_id;

    public Order toOrder() {
        return Order.builder()
                .user_id((long) user_id)
                .dog_id(dog_id)
                .build();
    }
}

