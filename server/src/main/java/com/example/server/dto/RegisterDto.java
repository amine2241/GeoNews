package com.example.server.dto;

import jakarta.validation.constraints.*;
import lombok.Data;


@Data
public class RegisterDto {
    @NotEmpty(message = "First name is required!")
    @Pattern(regexp="^[A-Za-z]*$",message = "Use alphabet characters only!")
    private String firstName;
    @Pattern(regexp="^[A-Za-z]*$",message = "Use alphabet characters only!")
    @NotEmpty(message = "Last name is required!")
    private String  lastName;
    @NotEmpty(message = "Username is required!")
    private String username;
    @NotEmpty(message = "Email is required!")
    @Email(message = "Please respect the email format!")
    private String  email;
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{5,}$" ,message = "Password must be at least: 5 Chars, 1 Special Char, 1 Uppercase Letter, 1 Number")
    private String password;

}
