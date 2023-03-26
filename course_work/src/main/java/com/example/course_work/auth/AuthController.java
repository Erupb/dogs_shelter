package com.example.course_work.auth;

import lombok.AllArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
@AllArgsConstructor
public class AuthController {
    private ApplicationUserService applicationUserService;

    @GetMapping("/authError")
    public String getAuthErrorPage() {
        return "authError.html";
    }


    @GetMapping("/login")
    public String getLoginPage() {
        return "login.html";
    }

    @GetMapping("")
    public String getIndexPage() {
        return "index.html";
    }

    @GetMapping("registration")
    public String getRegistrationPage(@ModelAttribute("user") User user) {
        return "registration.html";
    }

    @PostMapping("registration")
    public String signUpUser(@ModelAttribute("user") User user) {
        return applicationUserService.signUpUser(user);
    }

    @Secured("ADMIN")
    @GetMapping(value="/get/user/{id}")
    public String getUserById(Model model, @PathVariable(name="id") long id){
        model.addAttribute("users", applicationUserService.read(id));
        return "show_user.html";
    }

}