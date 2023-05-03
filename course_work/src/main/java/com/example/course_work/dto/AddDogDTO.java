package com.example.course_work.dto;

import com.example.course_work.model.Dog;
import lombok.Builder;
import lombok.Getter;
import com.example.course_work.model.Role;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Builder
public class AddDogDTO{
    @NotBlank(message = "Кличка не может быть пустой")
    private String name;

    @NotBlank(message = "Ссылка на картинку не может быть пустой")
    private String img;

    private int age;

    @NotBlank(message = "Порода не может быть пустой")
    private String breed;


    private String description;

    @NotBlank(message = "Пол не может быть пустым")
    @Size(min = 7, max = 7, message = "Пол должен содержать 7 цифр")
    private String gender;

    public Dog toDog() {
        return Dog.builder()
                .name(name)
                .img(img)
                .breed(breed)
                .gender(gender)
                .age(age)
                .description(description)
                .ordered(false)
                .build();
    }
}
