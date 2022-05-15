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
        ApplicationUser applicationUser = new ApplicationUser(userRepository.findUserByUsername(username));
        if (applicationUser.getUser() == null) {
            throw new UsernameNotFoundException(String.format("Username: %s not found", username));
        }
        return applicationUser;
    }

    public String signUpUser(User user) {
        boolean userExists = userRepository.findUserByUsername(user.getUsername()) != null;
        if (userExists) {
            //throw new IllegalStateException(String.format("User with username %s exists", user.getUsername()));
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
