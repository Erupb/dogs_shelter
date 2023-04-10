package com.example.course_work.auth;

import lombok.AllArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    private ApplicationUserService applicationUserService;

    //I think here we need to redirect user to react authError page
    @GetMapping("/authError")
    public String getAuthErrorPage() {
        return "authError.html";
    }

    //I think here we need to redirect user to react login page
    @GetMapping("/login")
    public String getLoginPage() {
        return "login.html";
    }

    //I think here we need to redirect user to react index page
    @GetMapping("")
    public String getIndexPage() {
        return "index.html";
    }

    //I think here we need to redirect user to react registration page
    @GetMapping("registration")
    public String getRegistrationPage(@ModelAttribute("user") User user) {
        return "registration.html";
    }

    /*@PostMapping("registration")
    public String signUpUser(@ModelAttribute("user") User user) {
        return applicationUserService.signUpUser(user);
    }*/
    @RequestMapping(value="/registration", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        applicationUserService.signUpUser(user);
        return ResponseEntity.ok().build();
    }

    /*@Secured("ADMIN")
    @GetMapping(value="/get/user/{id}")
    public String getUserById(Model model, @PathVariable(name="id") long id){
        model.addAttribute("users", applicationUserService.read(id));
        return "show_user.html";
    }*/
    @Secured("ADMIN")
    @GetMapping(value="/get/user/{id}")
    public User getUserById(@PathVariable(name="id") long id){
        return applicationUserService.read(id);
    }
}