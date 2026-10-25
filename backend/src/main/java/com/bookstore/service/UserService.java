package com.bookstore.service;

import com.bookstore.dto.AuthResponse;
import com.bookstore.dto.LoginRequest;
import com.bookstore.dto.RegisterRequest;
import com.bookstore.dto.UserDto;
import com.bookstore.entity.User;
import com.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse register(RegisterRequest request) {
        // Validate password confirmation if provided
        if (request.getConfirmPassword() != null && !request.getConfirmPassword().isBlank()) {
            if (!request.getPassword().equals(request.getConfirmPassword())) {
                return new AuthResponse(false, "Passwords do not match", null);
            }
        }

        // Check duplicate email
        String emailTrimmed = request.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(emailTrimmed)) {
            return new AuthResponse(false, "An account with email " + emailTrimmed + " already exists", null);
        }

        User user = new User();
        user.setFullName(request.getFullName().trim());
        user.setEmail(emailTrimmed);
        user.setPassword(request.getPassword()); // In production hash with BCrypt
        user.setPhone(request.getPhone() != null ? request.getPhone().trim() : "");
        user.setAddress(request.getAddress() != null ? request.getAddress().trim() : "");
        user.setRole("CUSTOMER");

        User saved = userRepository.save(user);

        UserDto userDto = new UserDto(
                saved.getId(),
                saved.getFullName(),
                saved.getEmail(),
                saved.getPhone(),
                saved.getAddress(),
                saved.getRole()
        );

        return new AuthResponse(true, "Registration successful! You can now login.", userDto);
    }

    public AuthResponse login(LoginRequest request) {
        String emailTrimmed = request.getEmail().trim().toLowerCase();
        Optional<User> userOpt = userRepository.findByEmail(emailTrimmed);

        if (userOpt.isEmpty()) {
            return new AuthResponse(false, "Invalid email or user does not exist", null);
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(request.getPassword())) {
            return new AuthResponse(false, "Incorrect password. Please try again.", null);
        }

        UserDto userDto = new UserDto(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getAddress(),
                user.getRole()
        );

        return new AuthResponse(true, "Login successful. Welcome back, " + user.getFullName() + "!", userDto);
    }

    public Optional<UserDto> getProfile(String email) {
        return userRepository.findByEmail(email.trim().toLowerCase())
                .map(u -> new UserDto(u.getId(), u.getFullName(), u.getEmail(), u.getPhone(), u.getAddress(), u.getRole()));
    }
}
