package com.example.course_work.dto;

import lombok.Builder;
import lombok.Getter;
import com.example.course_work.model.Role;
import com.example.course_work.model.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@Builder
public class RegisterUserDTO implements IUserDTO {
    @NotBlank(message = "Почта (имя пользователя) не может быть пустой")
    @Size(max = 50, message = "Почта не может превышать 50 символов")
    private String username;

    @NotBlank(message = "Пароль не может быть пустым")
    @Size(max = 255, message = "Пароль не может превышать 255 символов")
    private String password;

    @NotBlank(message = "Номер телефона не может отсутствовать")
    @Size(min = 10, max = 10, message = "Номер телефона должен содержать 10 цифр")
    private String phone_number;

    private String initials;

    public User toUser() {
        return User.builder()
                .username(username)
                .password(password)
                .phone_number(phone_number)
                .initials(initials)
                .role(Role.USER).build();
    }
}
