package com.example.course_work.security;

import org.springframework.security.core.GrantedAuthority;

public enum ApplicationUserRole implements GrantedAuthority {
    CUSTOMER,
    ADMIN;

    @Override
    public String getAuthority(){
        return name();
    }
}
