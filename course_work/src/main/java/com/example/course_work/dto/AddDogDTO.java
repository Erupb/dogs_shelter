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

    @NotBlank(message = "Описание не может быть пустым")
    private String description;

    public Dog toDog() {
        return Dog.builder()
                .name(name)
                .img(img)
                .breed(breed)
                .age(age)
                .description(description)
                .ordered(false)
                .build();
    }
}
