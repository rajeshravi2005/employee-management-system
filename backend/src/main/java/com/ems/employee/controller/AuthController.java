package com.ems.employee.controller;

import com.ems.employee.model.User;
import com.ems.employee.repository.UserRepository;
import com.ems.employee.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // DTO for login
    static class LoginRequest {
        public String email;
        public String password;
    }

    static class LoginResponse {
        public String message;
        public String token;

        public LoginResponse(String message, String token) {
            this.message = message;
            this.token = token;
        }
    }

    // LOGIN API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Compare passwords directly (no hashing)
            if (request.password.equals(user.getPassword())) {
                String token = jwtUtil.generateToken(user.getEmail());
                return ResponseEntity.ok(new LoginResponse("Login successful", token));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    // REGISTER API
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        // Save user as plain text password
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }
}
