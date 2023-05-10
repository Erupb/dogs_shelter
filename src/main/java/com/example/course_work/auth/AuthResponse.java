package com.example.course_work.auth;

import com.example.course_work.model.Role;

public class AuthResponse {
    private final String username;
    private final String token;
    private final Role role;

    public AuthResponse(String username, String token, Role role){
        this.username = username;
        this.token = token;
        this.role = role;
    }

    public String getToken(){
        return token;
    }

    public String getUsername() {
        return username;
    }

    public Role getRole() {
        return role;
    }
}