package com.example.course_work.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

/**
 * Описание класса
 */
@Getter
@Builder
public class GetUserDTO {

    private String username;

    private String phone_number;
}
