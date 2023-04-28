package com.example.course_work.auth;
import com.example.course_work.exception.WrongIdException;
import com.example.course_work.model.Dog;
import com.example.course_work.model.Role;
import com.example.course_work.repository.UserRepository;
import com.example.course_work.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.course_work.auth.api.AuthApi;
import com.example.course_work.dto.AuthRequestDTO;
import com.example.course_work.dto.AuthResponseDTO;
import com.example.course_work.dto.RegisterUserDTO;
import com.example.course_work.dto.UpdateUserDTO;
import com.example.course_work.exception.DuplicateUsernameException;
import com.example.course_work.exception.PasswordCheckException;
import com.example.course_work.mapper.UserMapper;
import com.example.course_work.model.User;
import com.example.course_work.security.JwtTokenProvider;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@AllArgsConstructor
public class AuthController implements AuthApi {

    private final AuthenticationManager manager;
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public ResponseEntity<?> register(@RequestBody @Valid RegisterUserDTO userDTO) throws DuplicateUsernameException, PasswordCheckException {
        try {
            userService.loadUserByUsername(userDTO.getUsername());
            throw new DuplicateUsernameException("Данная почта уже используется для другого аккаунта");
        } catch(UsernameNotFoundException ex) {
            userService.checkDTO(userDTO);
            User user = userDTO.toUser();
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setActive(true);
            userService.create(user);
            return new ResponseEntity<>("Вы успешно зарегистрировались в системе", HttpStatus.OK);
        }
    }

    public ResponseEntity<?> authenticate(@RequestBody @Valid AuthRequestDTO request) throws UsernameNotFoundException {
        String username = request.getUsername();
        manager.authenticate(new UsernamePasswordAuthenticationToken(username, request.getPassword()));
        User user = (User) userService.loadUserByUsername(request.getUsername());
        String token = jwtTokenProvider.generateToken(user);
        AuthResponseDTO response = AuthResponseDTO.builder()
                .username(user.getUsername()).token(token).id(user.getId())/*.role(user.getRole())*/
                .build();
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> editProfile(@RequestBody @Valid UpdateUserDTO dto, HttpServletRequest request)
            throws PasswordCheckException {
        String pass = userService.checkDTO(dto);
        String token = jwtTokenProvider.resolveToken(request);
        String username = jwtTokenProvider.getUsernameFromToken(token);
        User user = (User) userService.loadUserByUsername(username);
        userMapper.updateUserFromDto(dto, user);
        if (pass != null) {
            user.setPassword(pass);
        }
        userService.update(user);
        return new ResponseEntity<>("Данные вашего профиля обновлены", HttpStatus.OK);
    }

    @Secured("ADMIN")
    @GetMapping(value="/admin/get/user/{id}")
    public User getUserById(@PathVariable(name="id") long id) throws WrongIdException {
        return userService.getById(id);
    }

    @GetMapping(value="/get/user_role/{username}")
    public Role getUserById(@PathVariable(name="username") String username) {
        return userRepository.findByUsername(username).getRole();
    }

    /*public void logout(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextLogoutHandler handler = new SecurityContextLogoutHandler();
        handler.logout(request, response, null);
    }*/
}
