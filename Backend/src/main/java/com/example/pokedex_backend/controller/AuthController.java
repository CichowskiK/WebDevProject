package com.example.pokedex_backend.controller;

import com.example.pokedex_backend.model.User;
import com.example.pokedex_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000", "https://cichowskik.github.io/"})
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        User created = userService.register(body.get("username"), body.get("password"));

        return ResponseEntity.ok(Map.of(
                "id", created.getId(),
                "username", created.getUsername()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        User user = userService.login(body.get("username"), body.get("password"));

        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "username", user.getUsername()
        ));
    }
}
