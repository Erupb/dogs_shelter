package com.example.course_work;

import com.example.course_work.model.User;
import com.example.course_work.repository.UserRepository;
import com.example.course_work.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@ExtendWith(MockitoExtension.class)
class UserServiceTest1 {
    @Mock
    private UserRepository userRepository;

    UserService underTest;

    @BeforeEach
    public void setUp() {
        underTest = new UserService(userRepository, new BCryptPasswordEncoder(10));
    }

    @Test
    public void getUsers() {
        // given
        User user = new User();
        user.setUsername("user");

        // when
        Mockito.when(userRepository.findByUsername(user.getUsername())).thenReturn(user);

        // then
        Assertions.assertEquals(user.getUsername(), underTest.loadUserByUsername(user.getUsername()).getUsername());
    }
}
