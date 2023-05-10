package com.example.course_work.auth.api;

import com.example.course_work.dto.AuthRequestDTO;
import com.example.course_work.dto.RegisterUserDTO;
import com.example.course_work.dto.UpdateUserDTO;
import com.example.course_work.exception.DuplicateUsernameException;
import com.example.course_work.exception.PasswordCheckException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

/**
 * Описание класса
 */
public interface AuthApi {
    @RequestMapping(
            method = RequestMethod.POST,
            value = "/auth/register",
            produces = { "application/json" }
    )
    ResponseEntity<?> register(
            @RequestBody @Valid RegisterUserDTO userDTO
    ) throws DuplicateUsernameException, PasswordCheckException;

    @RequestMapping(
            method = RequestMethod.POST,
            value = "/auth/login",
            produces = { "application/json" }
    )
    ResponseEntity<?> authenticate(
            @RequestBody @Valid AuthRequestDTO request
    ) throws UsernameNotFoundException;

    /*@RequestMapping(
            method = RequestMethod.PATCH,
            value = "/auth/edit"
    )
    ResponseEntity<?> editProfile(
            @RequestBody @Valid UpdateUserDTO dto,
            HttpServletRequest request
    ) throws PasswordCheckException;*/

    /*@RequestMapping(
            method = RequestMethod.POST,
            value = "/auth/logout"
    )
    void logout(
            HttpServletRequest request,
            HttpServletResponse response
    );*/
}