package com.example.course_work.security;

import com.example.course_work.auth.ApplicationUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {
    private final PasswordEncoder passwordEncoder;
    private final ApplicationUserService applicationUserService;

    @Autowired
    public ApplicationSecurityConfig(PasswordEncoder passwordEncoder, ApplicationUserService applicationUserService) {
        this.passwordEncoder = passwordEncoder;
        this.applicationUserService = applicationUserService;
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(applicationUserService);
        return provider;
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return new CustomAccessDeniedHandler();
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());


        auth.inMemoryAuthentication()
                .withUser("admin1")
                .password(passwordEncoder.encode("pass"))
                .roles("ADMIN")
                .and()
                .withUser("customer1")
                .password(passwordEncoder.encode("cust"))
                .roles("CUSTOMER")
        ;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/dogs/add_dogs").hasRole("ADMIN")
                .antMatchers("/dogs/admin/**").hasRole("ADMIN")
                //.antMatchers("/dogs/get/**").hasRole("CUSTOMER")
                .antMatchers("/", "/logout", "/login", "/registration")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()

                .exceptionHandling().accessDeniedHandler(accessDeniedHandler())

                //.and()
                //.exceptionHandling().accessDeniedPage("/accessDenied.jsp")
                .and()
                .formLogin()

                .loginPage("/login").permitAll()
                .defaultSuccessUrl("/", true)
                .failureUrl("/authError");
    }
}