package com.example.server.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisterDto {
    @NotEmpty(message = "FirstName is required")
    private String firstName;
    @NotEmpty(message = "LastName is required")
    private String  lastName;
    @NotEmpty(message = "Username is required")
    private String username;
    @NotEmpty(message = "Email is required")
    private String  email;
    @NotEmpty(message = "Password is required")
    private String password;

}
