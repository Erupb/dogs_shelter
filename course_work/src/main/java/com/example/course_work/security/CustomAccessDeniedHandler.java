package com.example.course_work.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        Authentication auth = SecurityContextHolder.getContext()
                .getAuthentication();
        /*if (auth != null) {
            LOG.warn("User: " + auth.getName() + " attempted to access the protected URL: " + request.getRequestURI());
        }*/

        response.sendRedirect(request.getContextPath() + "/accessDenied");
    }
}
