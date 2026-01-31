package com.LeanAranda.notesApp.configuration;

import com.LeanAranda.notesApp.dto.LoginRequest;
import com.LeanAranda.notesApp.dto.UserDto;
import com.LeanAranda.notesApp.model.User;
import com.LeanAranda.notesApp.service.IUserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final IUserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(IUserService userService, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto userDto){
        userService.create(new User(userDto.getUsername(), userDto.getPassword()));
        return ResponseEntity.ok(Map.of( "message", "User created successfully", "username", userDto.getUsername() ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req, HttpServletResponse response) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
        );

        String token = jwtUtil.generateToken(req.getUsername());

        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);               // no JS
        cookie.setSecure(true);                 // HTTPS only
        cookie.setPath("/");                    // full app
        cookie.setMaxAge(30 * 24 * 60 * 60);    // 30 days
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of( "message", "Login successful", "username", req.getUsername() ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // expires immediately
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("message", "Logged out"));
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkAuth(HttpServletRequest request) {
        String token = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    token = cookie.getValue();
                }
            }
        }
        if (token != null && jwtUtil.validateToken(token) != null) {
            return ResponseEntity.ok(Map.of("status", "valid"));
        } else {
            return ResponseEntity.ok(Map.of("status", "invalid"));
        }
    }

}
