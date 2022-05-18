package com.example.course_work;

import com.example.course_work.auth.ApplicationUserService;
import com.example.course_work.auth.User;
import com.example.course_work.auth.UserRepository;
import com.example.course_work.services.EmailService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class UserServiceTest1 {
    @Mock
    private UserRepository userRepository;

    ApplicationUserService underTest;

    @BeforeEach
    public void setUp() {
        underTest = new ApplicationUserService(new BCryptPasswordEncoder(10), userRepository);
    }

    @Test
    public void getUsers() {
        // given
        User user = new User();
        user.setUsername("user");

        // when
        Mockito.when(userRepository.findUserByUsername(user.getUsername())).thenReturn(user);

        // then
        Assertions.assertEquals(user.getUsername(), underTest.loadUserByUsername(user.getUsername()).getUsername());
    }
}

