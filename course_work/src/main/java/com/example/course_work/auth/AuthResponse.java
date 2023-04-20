package com.example.course_work.auth;

public class AuthResponse {
    private final String username;
    private final String token;

    public AuthResponse(String username, String token){
        this.username = username;
        this.token = token;
    }

    public String getToken(){
        return token;
    }

    public String getUsername() {
        return username;
    }
}