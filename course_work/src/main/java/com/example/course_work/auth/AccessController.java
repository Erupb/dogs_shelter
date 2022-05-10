package com.example.course_work.auth;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/accessDenied")
@AllArgsConstructor
public class AccessController {
    @GetMapping("")
    public String getAccessDenied() {
        return "accessDenied.html";
    }
}
