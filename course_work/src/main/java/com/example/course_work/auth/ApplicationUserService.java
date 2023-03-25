package com.example.course_work.auth;

import com.example.course_work.security.ApplicationUserRole;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@Slf4j
public class ApplicationUserService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Autowired
    public ApplicationUserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("No user found for "+ username + ".");
        }
        return user;
    }

    public String signUpUser(User user) {
        boolean userExists = userRepository.findByUsername(user.getUsername()) != null;
        if (userExists) {
            return "user_exists";
        }

        String password = user.getPassword();
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(ApplicationUserRole.CUSTOMER);
        log.info("Sign up application user with username - {}", user.getUsername());
        userRepository.save(user);
        return "login";
    }
}
