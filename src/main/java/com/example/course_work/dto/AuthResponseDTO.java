package com.example.course_work.dto;

import com.example.course_work.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {
    String username;
    String token;
    Long id;/*
    Role role;*/
}
