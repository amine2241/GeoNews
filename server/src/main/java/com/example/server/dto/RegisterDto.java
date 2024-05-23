package com.example.server.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.UniqueElements;

@Data
public class RegisterDto {
    @NotEmpty(message = "FirstName is required")
    private String firstName;
    @NotEmpty(message = "LastName is required")
    private String  lastName;
    @NotEmpty(message = "Username is required")
    @UniqueElements
    private String username;
    @NotEmpty(message = "Email is required")
    @Email(message = "Please respect the email format")
    private String  email;
    @Length(min=5, message="Please set the password correctly: (at least 5 characters)")
    private String password;

}
